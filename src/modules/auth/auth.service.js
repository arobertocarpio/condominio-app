const prisma = require('../../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MAX_INTENTOS = 5;

exports.register = async ({ correo, password, rol }) => {
    if (!correo || !password) {
        throw new Error('Correo y contraseña son obligatorios.');
    }

    const existe = await prisma.usuario.findUnique({ where: { correo: correo.toLowerCase() } });
    if (existe) throw new Error('Ya hay un usuario registrado con ese correo.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
        data: {
            correo: correo.toLowerCase(),
            password: hashedPassword,
            rol: rol || 'residente',
        },
    });

    return {
        id: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
    };
};

exports.login = async ({ correo, password }) => {
    if (!correo || !password) {
        throw new Error('Correo y contraseña son obligatorios.');
    }

    const usuario = await prisma.usuario.findUnique({
        where: { correo: correo.toLowerCase() },
    });

    if (!usuario) {
        throw new Error('Correo o contraseña incorrectos.');
    }

    if (usuario.cuenta_bloq === 'S') {
        throw new Error('Cuenta bloqueada. Contacte al administrador.');
    }

    const valid = await bcrypt.compare(password, usuario.password);

    if (!valid) {
        const nuevosIntentos = usuario.intentos_fallidos + 1;
        const bloqueada = nuevosIntentos >= MAX_INTENTOS ? 'S' : 'N';

        await prisma.usuario.update({
            where: { id_usuario: usuario.id_usuario },
            data: {
                intentos_fallidos: nuevosIntentos,
                cuenta_bloq: bloqueada,
            },
        });

        if (bloqueada === 'S') {
            throw new Error('Cuenta bloqueada por demasiados intentos fallidos.');
        }

        throw new Error('Correo o contraseña incorrectos.');
    }

    if (usuario.intentos_fallidos > 0) {
        await prisma.usuario.update({
            where: { id_usuario: usuario.id_usuario },
            data: { intentos_fallidos: 0 },
        });
    }

    const token = jwt.sign(
        { id: usuario.id_usuario, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        token,
        usuario: {
            id: usuario.id_usuario,
            correo: usuario.correo,
            rol: usuario.rol,
        },
    };
};

exports.getProfile = async (userId) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id_usuario: userId },
        select: {
            id_usuario: true,
            correo: true,
            rol: true,
            fecha_registro: true,
            cuenta_bloq: true,
            residentes: {
                select: { id_residente: true, nombre: true, telefono: true, departamento: true, edificio: true },
            },
            vigilantes: {
                select: { id_vigilante: true, nombre: true, telefono: true },
            },
            administradores: {
                select: { id_admin: true, nombre: true },
            },
        },
    });

    if (!usuario) throw new Error('Usuario no encontrado.');
    return usuario;
};

exports.cambiarPassword = async (userId, { passwordActual, passwordNuevo }) => {
    if (!passwordActual || !passwordNuevo) {
        throw new Error('La contraseña actual y la nueva son obligatorias.');
    }

    if (passwordNuevo.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres.');
    }

    const usuario = await prisma.usuario.findUnique({
        where: { id_usuario: userId },
    });

    if (!usuario) throw new Error('Usuario no encontrado.');

    const valid = await bcrypt.compare(passwordActual, usuario.password);
    if (!valid) throw new Error('La contraseña actual es incorrecta.');

    const hashedPassword = await bcrypt.hash(passwordNuevo, 10);

    await prisma.usuario.update({
        where: { id_usuario: userId },
        data: { password: hashedPassword },
    });

    return { message: 'Contraseña actualizada correctamente.' };
};

const prisma = require('../../config/prisma');
const bcrypt = require('bcrypt');

const obtenerTodos = async () => {
    return prisma.usuario.findMany({
        select: {
            id_usuario: true,
            correo: true,
            rol: true,
            intentos_fallidos: true,
            cuenta_bloq: true,
            fecha_registro: true,
        },
        orderBy: { fecha_registro: 'desc' },
    });
};

const obtenerPorId = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id_usuario: id },
        select: {
            id_usuario: true,
            correo: true,
            rol: true,
            intentos_fallidos: true,
            cuenta_bloq: true,
            fecha_registro: true,
            residentes: true,
            vigilantes: true,
            administradores: true,
        },
    });
    if (!usuario) throw new Error('Usuario no encontrado.');
    return usuario;
};

const register = async ({ correo, password, rol }) => {
    if (!correo || !password) {
        throw new Error('Correo y contraseña son obligatorios.');
    }

    const existe = await prisma.usuario.findUnique({ where: { correo: correo.toLowerCase() } });
    if (existe) throw new Error('Ya hay un usuario con ese correo electrónico.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
        data: {
            correo: correo.toLowerCase(),
            password: hashedPassword,
            rol: rol || 'residente',
        },
    });

    return {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
        fecha_registro: usuario.fecha_registro,
    };
};

const actualizar = async (id, data) => {
    const usuario = await prisma.usuario.findUnique({ where: { id_usuario: id } });
    if (!usuario) throw new Error('Usuario no encontrado.');

    const updateData = {};
    if (data.correo) updateData.correo = data.correo.toLowerCase();
    if (data.rol) updateData.rol = data.rol;
    if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

    return prisma.usuario.update({
        where: { id_usuario: id },
        data: updateData,
        select: {
            id_usuario: true,
            correo: true,
            rol: true,
            cuenta_bloq: true,
            fecha_registro: true,
        },
    });
};

const eliminar = async (id) => {
    const usuario = await prisma.usuario.findUnique({ where: { id_usuario: id } });
    if (!usuario) throw new Error('Usuario no encontrado.');
    return prisma.usuario.delete({ where: { id_usuario: id } });
};

const bloquear = async (id) => {
    const usuario = await prisma.usuario.findUnique({ where: { id_usuario: id } });
    if (!usuario) throw new Error('Usuario no encontrado.');
    return prisma.usuario.update({
        where: { id_usuario: id },
        data: { cuenta_bloq: 'S', intentos_fallidos: 0 },
        select: { id_usuario: true, correo: true, cuenta_bloq: true },
    });
};

const desbloquear = async (id) => {
    const usuario = await prisma.usuario.findUnique({ where: { id_usuario: id } });
    if (!usuario) throw new Error('Usuario no encontrado.');
    return prisma.usuario.update({
        where: { id_usuario: id },
        data: { cuenta_bloq: 'N', intentos_fallidos: 0 },
        select: { id_usuario: true, correo: true, cuenta_bloq: true },
    });
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    register,
    actualizar,
    eliminar,
    bloquear,
    desbloquear,
};
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
    const userId = id;

    return prisma.$transaction(async (tx) => {
        const usuario = await tx.usuario.findUnique({
            where: { id_usuario: userId },
            include: {
                residentes: true,
                vigilantes: true,
                administradores: true,
            },
        });

        if (!usuario) throw new Error('Usuario no encontrado.');

        // ── Eliminar datos ligados a residentes de este usuario ──
        for (const residente of usuario.residentes) {
            const residenteId = residente.id_residente;

            const residenteFull = await tx.residente.findUnique({
                where: { id_residente: residenteId },
                include: {
                    matriculas: true,
                    pagos: true,
                },
            });

            if (residenteFull) {
                const matriculas = residenteFull.matriculas || [];

                // Accesos por matrícula (estacionamiento)
                if (matriculas.length > 0) {
                    const placas = matriculas.map((m) => m.matricula);
                    await tx.acceso.deleteMany({
                        where: {
                            matricula_fk: { in: placas },
                        },
                    });
                }

                // Matrículas del residente
                await tx.matricula.deleteMany({
                    where: { id_residente_fk: residenteId },
                });

                // Pagos del residente
                await tx.estadoPago.deleteMany({
                    where: { id_residente_fk: residenteId },
                });

                // Buscar todos los departamentos donde haya residentes de este usuario
                const departamentosUsuario = await tx.departamento.findMany({
                    where: {
                        residentes: {
                            some: {
                                id_usuario_fk: userId,
                            },
                        },
                    },
                });

                if (departamentosUsuario.length > 0) {
                    const deptoIds = departamentosUsuario.map((d) => d.id_departamento);

                    // Cajones de esos departamentos (y accesos de esos cajones)
                    const cajones = await tx.cajon.findMany({
                        where: { id_departamento_fk: { in: deptoIds } },
                    });

                    if (cajones.length > 0) {
                        const cajonIds = cajones.map((c) => c.id_cajon);

                        await tx.acceso.deleteMany({
                            where: {
                                id_cajon_fk: { in: cajonIds },
                            },
                        });

                        await tx.cajon.deleteMany({
                            where: { id_cajon: { in: cajonIds } },
                        });
                    }
                }

                // Finalmente, residente
                await tx.residente.delete({
                    where: { id_residente: residenteId },
                });
            }
        }

        // ── Eliminar datos ligados a vigilantes de este usuario ──
        if (usuario.vigilantes.length > 0) {
            const vigilanteIds = usuario.vigilantes.map((v) => v.id_vigilante);

            await tx.acceso.deleteMany({
                where: { id_vigilante_fk: { in: vigilanteIds } },
            });

            await tx.vigilante.deleteMany({
                where: { id_vigilante: { in: vigilanteIds } },
            });
        }

        // ── Eliminar datos ligados a administradores de este usuario ──
        if (usuario.administradores.length > 0) {
            const adminIds = usuario.administradores.map((a) => a.id_admin);

            await tx.anuncio.deleteMany({
                where: { id_admin_fk: { in: adminIds } },
            });

            await tx.administrador.deleteMany({
                where: { id_admin: { in: adminIds } },
            });
        }

        // ── Eliminar tokens de recuperación de contraseña ──
        await tx.passwordResetToken.deleteMany({
            where: { id_usuario_fk: userId },
        });

        // ── Finalmente, eliminar el usuario ──
        return tx.usuario.delete({
            where: { id_usuario: userId },
        });
    });
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
const prisma = require('../../config/prisma');

exports.obtenerEstadisticas = async () => {
    const [
        totalEdificios,
        totalDepartamentos,
        totalResidentes,
        totalVigilantes,
        totalVisitantes,
        visitantesActivos,
        totalCajones,
        cajonesDisponibles,
        accesosActivos,
        pagosVencidos,
        pagosPendientes,
        totalAnuncios,
    ] = await Promise.all([
        prisma.edificio.count(),
        prisma.departamento.count(),
        prisma.residente.count(),
        prisma.vigilante.count(),
        prisma.visitante.count(),
        prisma.visitante.count({ where: { activo: 'S' } }),
        prisma.cajon.count(),
        prisma.cajon.count({ where: { estado: 'disponible' } }),
        prisma.acceso.count({ where: { hora_salida: null } }),
        prisma.estadoPago.count({
            where: {
                estatus: 'pendiente',
                fecha_vencimiento: { lt: new Date() },
            },
        }),
        prisma.estadoPago.count({ where: { estatus: 'pendiente' } }),
        prisma.anuncio.count(),
    ]);

    // Accesos de hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const accesosHoy = await prisma.acceso.count({
        where: { hora_entrada: { gte: hoy } },
    });

    return {
        edificios: totalEdificios,
        departamentos: totalDepartamentos,
        residentes: totalResidentes,
        vigilantes: totalVigilantes,
        visitantes: {
            total: totalVisitantes,
            activos: visitantesActivos,
        },
        cajones: {
            total: totalCajones,
            disponibles: cajonesDisponibles,
            ocupados: totalCajones - cajonesDisponibles,
        },
        accesos: {
            activos: accesosActivos,
            hoy: accesosHoy,
        },
        pagos: {
            pendientes: pagosPendientes,
            vencidos: pagosVencidos,
        },
        anuncios: totalAnuncios,
    };
};

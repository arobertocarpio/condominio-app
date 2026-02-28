const prisma = require('../../config/prisma');

class ResidenteService {
  async crear(data) {
    const { matricula, ...residenteData } = data;

    return await prisma.$transaction(async (tx) => {
      const residente = await tx.residente.create({
        data: residenteData,
        include: {
          departamento: true,
          edificio: true,
          usuario: true
        }
      });

      if (matricula) {
        const matriculaCreada = await tx.matricula.create({
          data: {
            matricula,
            id_residente_fk: residente.id_residente
          }
        });
        residente.matriculas = [matriculaCreada];
      }

      return residente;
    });
  }

  async obtenerTodos() {
    return await prisma.residente.findMany({
      include: {
        departamento: true,
        edificio: true,
        usuario: {
          select: {
            id_usuario: true,
            correo: true,
            rol: true
          }
        },
        matriculas: true,
        pagos: true
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.residente.findUnique({
      where: { id_residente: parseInt(id) },
      include: {
        departamento: true,
        edificio: true,
        usuario: {
          select: {
            id_usuario: true,
            correo: true,
            rol: true
          }
        },
        matriculas: true,
        pagos: true
      }
    });
  }

  async obtenerPorDepartamento(idDepartamento) {
    return await prisma.residente.findMany({
      where: { id_departamento_fk: parseInt(idDepartamento) },
      include: {
        usuario: {
          select: {
            correo: true,
            rol: true
          }
        }
      }
    });
  }

  async obtenerPorUsuario(idUsuario) {
    return await prisma.residente.findFirst({
      where: { id_usuario_fk: parseInt(idUsuario) },
      include: {
        departamento: true,
        edificio: true,
        matriculas: true,
        pagos: true
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.residente.update({
      where: { id_residente: parseInt(id) },
      data,
      include: {
        departamento: true,
        edificio: true,
        usuario: {
          select: {
            correo: true,
            rol: true
          }
        }
      }
    });
  }

  async eliminar(id) {
    const residenteId = parseInt(id);

    const residente = await prisma.residente.findUnique({
      where: { id_residente: residenteId },
      include: { matriculas: true },
    });

    if (!residente) {
      throw new Error('Residente no encontrado');
    }

    const departamentoId = residente.id_departamento_fk;
    const placas = (residente.matriculas || []).map((m) => m.matricula);

    console.log('[eliminarResidente] id:', residenteId, 'depto:', departamentoId, 'placas:', placas);

    // 1) Accesos que referencian las matrículas del residente
    if (placas.length > 0) {
      const r1 = await prisma.acceso.deleteMany({ where: { matricula_fk: { in: placas } } });
      console.log('[eliminarResidente] accesos por matrícula borrados:', r1.count);
    }

    // 2) Matrículas del residente
    const r2 = await prisma.matricula.deleteMany({ where: { id_residente_fk: residenteId } });
    console.log('[eliminarResidente] matrículas borradas:', r2.count);

    // 3) Pagos del residente
    const r3 = await prisma.estadoPago.deleteMany({ where: { id_residente_fk: residenteId } });
    console.log('[eliminarResidente] pagos borrados:', r3.count);

    // 4) Cajones del departamento (y sus accesos)
    const cajones = await prisma.cajon.findMany({ where: { id_departamento_fk: departamentoId } });
    console.log('[eliminarResidente] cajones encontrados:', cajones.length);

    if (cajones.length > 0) {
      const cajonIds = cajones.map((c) => c.id_cajon);
      const r4a = await prisma.acceso.deleteMany({ where: { id_cajon_fk: { in: cajonIds } } });
      console.log('[eliminarResidente] accesos por cajón borrados:', r4a.count);
      const r4b = await prisma.cajon.deleteMany({ where: { id_cajon: { in: cajonIds } } });
      console.log('[eliminarResidente] cajones borrados:', r4b.count);
    }

    // 5) Residente
    await prisma.residente.delete({ where: { id_residente: residenteId } });
    console.log('[eliminarResidente] residente borrado');

    // 6) Si el departamento quedó vacío, borrarlo
    const restantes = await prisma.residente.count({ where: { id_departamento_fk: departamentoId } });
    const visitantes = await prisma.visitante.count({ where: { id_departamento_fk: departamentoId } });
    console.log('[eliminarResidente] residentes restantes en depto:', restantes, 'visitantes:', visitantes);

    if (restantes === 0 && visitantes === 0) {
      await prisma.departamento.delete({ where: { id_departamento: departamentoId } });
      console.log('[eliminarResidente] departamento borrado');
    }

    return { success: true };
  }
}

module.exports = new ResidenteService();

const prisma = require('../../config/prisma');

class VisitanteService {
  async crear(data) {
    const { matricula, ...visitanteData } = data;

    return await prisma.$transaction(async (tx) => {
      const visitante = await tx.visitante.create({
        data: visitanteData,
        include: {
          departamento: true,
          edificio: true
        }
      });

      if (matricula) {
        const matriculaCreada = await tx.matricula.create({
          data: {
            matricula,
            id_visitante_fk: visitante.id_visitante
          }
        });
        visitante.matriculas = [matriculaCreada];
      }

      return visitante;
    });
  }

  async obtenerTodos() {
    return await prisma.visitante.findMany({
      include: {
        departamento: true,
        edificio: true,
        matriculas: true,
        accesos: {
          take: 5,
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async obtenerActivos() {
    return await prisma.visitante.findMany({
      where: { activo: 'S' },
      include: {
        departamento: true,
        edificio: true,
        matriculas: true,
        accesos: {
          take: 1,
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.visitante.findUnique({
      where: { id_visitante: parseInt(id) },
      include: {
        departamento: true,
        edificio: true,
        matriculas: true,
        accesos: {
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async obtenerPorDepartamento(idDepartamento) {
    return await prisma.visitante.findMany({
      where: {
        id_departamento_fk: parseInt(idDepartamento),
        activo: 'S'
      },
      include: {
        matriculas: true
      }
    });
  }

  async obtenerPorCategoria(categoria) {
    return await prisma.visitante.findMany({
      where: {
        categoria,
        activo: 'S'
      },
      include: {
        departamento: true,
        edificio: true
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.visitante.update({
      where: { id_visitante: parseInt(id) },
      data,
      include: {
        departamento: true,
        edificio: true
      }
    });
  }

  async desactivar(id) {
    return await prisma.visitante.update({
      where: { id_visitante: parseInt(id) },
      data: { activo: 'N' }
    });
  }

  async activar(id) {
    return await prisma.visitante.update({
      where: { id_visitante: parseInt(id) },
      data: { activo: 'S' }
    });
  }

  async eliminar(id) {
    return await prisma.visitante.delete({
      where: { id_visitante: parseInt(id) }
    });
  }
}

module.exports = new VisitanteService();

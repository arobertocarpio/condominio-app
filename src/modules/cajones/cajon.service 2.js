const prisma = require('../../config/prisma');

class CajonService {
  async crear(data) {
    return await prisma.cajon.create({
      data,
      include: {
        departamento: true
      }
    });
  }

  async obtenerTodos() {
    return await prisma.cajon.findMany({
      include: {
        departamento: {
          include: {
            edificio: true
          }
        },
        accesos: {
          take: 5,
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.cajon.findUnique({
      where: { id_cajon: parseInt(id) },
      include: {
        departamento: {
          include: {
            edificio: true,
            residentes: true
          }
        },
        accesos: {
          orderBy: {
            hora_entrada: 'desc'
          },
          include: {
            matricula: true,
            vigilante: true
          }
        }
      }
    });
  }

  async obtenerPorDepartamento(idDepartamento) {
    return await prisma.cajon.findMany({
      where: { id_departamento_fk: parseInt(idDepartamento) },
      include: {
        accesos: {
          take: 10,
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async obtenerDisponibles() {
    return await prisma.cajon.findMany({
      where: { estado: 'disponible' },
      include: {
        departamento: {
          include: {
            edificio: true
          }
        }
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.cajon.update({
      where: { id_cajon: parseInt(id) },
      data,
      include: {
        departamento: true
      }
    });
  }

  async eliminar(id) {
    return await prisma.cajon.delete({
      where: { id_cajon: parseInt(id) }
    });
  }
}

module.exports = new CajonService();

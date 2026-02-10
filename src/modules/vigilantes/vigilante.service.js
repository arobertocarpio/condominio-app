const prisma = require('../../config/prisma');

class VigilanteService {
  async crear(data) {
    return await prisma.vigilante.create({
      data,
      include: {
        usuario: {
          select: {
            id_usuario: true,
            correo: true,
            rol: true
          }
        }
      }
    });
  }

  async obtenerTodos() {
    return await prisma.vigilante.findMany({
      include: {
        usuario: {
          select: {
            id_usuario: true,
            correo: true,
            rol: true
          }
        },
        accesos: {
          take: 10,
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.vigilante.findUnique({
      where: { id_vigilante: parseInt(id) },
      include: {
        usuario: {
          select: {
            id_usuario: true,
            correo: true,
            rol: true
          }
        },
        accesos: {
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async obtenerPorUsuario(idUsuario) {
    return await prisma.vigilante.findFirst({
      where: { id_usuario_fk: parseInt(idUsuario) },
      include: {
        accesos: {
          take: 20,
          orderBy: {
            hora_entrada: 'desc'
          }
        }
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.vigilante.update({
      where: { id_vigilante: parseInt(id) },
      data,
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

  async eliminar(id) {
    return await prisma.vigilante.delete({
      where: { id_vigilante: parseInt(id) }
    });
  }
}

module.exports = new VigilanteService();

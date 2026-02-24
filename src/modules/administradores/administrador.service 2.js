const prisma = require('../../config/prisma');

class AdministradorService {
  async crear(data) {
    return await prisma.administrador.create({
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
    return await prisma.administrador.findMany({
      include: {
        usuario: {
          select: {
            id_usuario: true,
            correo: true,
            rol: true
          }
        },
        anuncios: {
          take: 5,
          orderBy: {
            fecha_publicacion: 'desc'
          }
        }
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.administrador.findUnique({
      where: { id_admin: parseInt(id) },
      include: {
        usuario: {
          select: {
            id_usuario: true,
            correo: true,
            rol: true
          }
        },
        anuncios: {
          orderBy: {
            fecha_publicacion: 'desc'
          }
        }
      }
    });
  }

  async obtenerPorUsuario(idUsuario) {
    return await prisma.administrador.findFirst({
      where: { id_usuario_fk: parseInt(idUsuario) },
      include: {
        anuncios: {
          orderBy: {
            fecha_publicacion: 'desc'
          }
        }
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.administrador.update({
      where: { id_admin: parseInt(id) },
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
    return await prisma.administrador.delete({
      where: { id_admin: parseInt(id) }
    });
  }
}

module.exports = new AdministradorService();

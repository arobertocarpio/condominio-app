const prisma = require('../../config/prisma');

class AnuncioService {
  async crear(data) {
    return await prisma.anuncio.create({
      data,
      include: {
        administrador: {
          include: {
            usuario: {
              select: {
                correo: true,
                rol: true
              }
            }
          }
        }
      }
    });
  }

  async obtenerTodos() {
    return await prisma.anuncio.findMany({
      include: {
        administrador: {
          include: {
            usuario: {
              select: {
                correo: true,
                rol: true
              }
            }
          }
        }
      },
      orderBy: {
        fecha_publicacion: 'desc'
      }
    });
  }

  async obtenerRecientes(limite = 10) {
    return await prisma.anuncio.findMany({
      take: limite,
      include: {
        administrador: {
          include: {
            usuario: {
              select: {
                correo: true,
                rol: true
              }
            }
          }
        }
      },
      orderBy: {
        fecha_publicacion: 'desc'
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.anuncio.findUnique({
      where: { id_anuncio: parseInt(id) },
      include: {
        administrador: {
          include: {
            usuario: {
              select: {
                correo: true,
                rol: true
              }
            }
          }
        }
      }
    });
  }

  async obtenerPorAdministrador(idAdmin) {
    return await prisma.anuncio.findMany({
      where: { id_admin_fk: parseInt(idAdmin) },
      orderBy: {
        fecha_publicacion: 'desc'
      }
    });
  }

  async obtenerPorFecha(fechaInicio, fechaFin) {
    return await prisma.anuncio.findMany({
      where: {
        fecha_publicacion: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin)
        }
      },
      include: {
        administrador: {
          include: {
            usuario: {
              select: {
                correo: true
              }
            }
          }
        }
      },
      orderBy: {
        fecha_publicacion: 'desc'
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.anuncio.update({
      where: { id_anuncio: parseInt(id) },
      data,
      include: {
        administrador: {
          include: {
            usuario: {
              select: {
                correo: true
              }
            }
          }
        }
      }
    });
  }

  async eliminar(id) {
    return await prisma.anuncio.delete({
      where: { id_anuncio: parseInt(id) }
    });
  }
}

module.exports = new AnuncioService();

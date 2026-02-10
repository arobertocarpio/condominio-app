const prisma = require('../../config/prisma');

class AccesoService {
  async registrarEntrada(data) {
    return await prisma.acceso.create({
      data,
      include: {
        matricula: true,
        cajon: true,
        vigilante: true,
        visitante: true
      }
    });
  }

  async registrarSalida(idAcceso) {
    return await prisma.acceso.update({
      where: { id_accesos: parseInt(idAcceso) },
      data: {
        hora_salida: new Date()
      },
      include: {
        matricula: true,
        cajon: true,
        vigilante: true
      }
    });
  }

  async obtenerTodos() {
    return await prisma.acceso.findMany({
      include: {
        matricula: {
          include: {
            residente: true,
            visitante: true
          }
        },
        cajon: true,
        vigilante: true,
        visitante: true
      },
      orderBy: {
        hora_entrada: 'desc'
      },
      take: 100
    });
  }

  async obtenerPorId(id) {
    return await prisma.acceso.findUnique({
      where: { id_accesos: parseInt(id) },
      include: {
        matricula: {
          include: {
            residente: {
              include: {
                departamento: true,
                edificio: true
              }
            },
            visitante: {
              include: {
                departamento: true,
                edificio: true
              }
            }
          }
        },
        cajon: true,
        vigilante: true,
        visitante: true
      }
    });
  }

  async obtenerPorMatricula(matricula) {
    return await prisma.acceso.findMany({
      where: { matricula_fk: matricula },
      include: {
        cajon: true,
        vigilante: true,
        visitante: true
      },
      orderBy: {
        hora_entrada: 'desc'
      }
    });
  }

  async obtenerPorVigilante(idVigilante) {
    return await prisma.acceso.findMany({
      where: { id_vigilante_fk: parseInt(idVigilante) },
      include: {
        matricula: {
          include: {
            residente: true,
            visitante: true
          }
        },
        cajon: true
      },
      orderBy: {
        hora_entrada: 'desc'
      }
    });
  }

  async obtenerAccesosActivos() {
    return await prisma.acceso.findMany({
      where: {
        hora_salida: null
      },
      include: {
        matricula: {
          include: {
            residente: {
              include: {
                departamento: true
              }
            },
            visitante: {
              include: {
                departamento: true
              }
            }
          }
        },
        cajon: true,
        vigilante: true
      },
      orderBy: {
        hora_entrada: 'desc'
      }
    });
  }

  async obtenerPorFecha(fechaInicio, fechaFin) {
    return await prisma.acceso.findMany({
      where: {
        hora_entrada: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin)
        }
      },
      include: {
        matricula: {
          include: {
            residente: true,
            visitante: true
          }
        },
        vigilante: true,
        cajon: true
      },
      orderBy: {
        hora_entrada: 'desc'
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.acceso.update({
      where: { id_accesos: parseInt(id) },
      data,
      include: {
        matricula: true,
        cajon: true,
        vigilante: true
      }
    });
  }

  async eliminar(id) {
    return await prisma.acceso.delete({
      where: { id_accesos: parseInt(id) }
    });
  }
}

module.exports = new AccesoService();

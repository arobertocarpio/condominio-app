const prisma = require('../../config/prisma');

class MatriculaService {
  async crear(data) {
    return await prisma.matricula.create({
      data,
      include: {
        residente: true,
        visitante: true
      }
    });
  }

  async obtenerTodas() {
    return await prisma.matricula.findMany({
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

  async obtenerPorId(matricula) {
    return await prisma.matricula.findUnique({
      where: { matricula },
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
        },
        accesos: {
          orderBy: {
            hora_entrada: 'desc'
          },
          include: {
            vigilante: true,
            cajon: true
          }
        }
      }
    });
  }

  async obtenerPorResidente(idResidente) {
    return await prisma.matricula.findMany({
      where: { id_residente_fk: parseInt(idResidente) },
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

  async obtenerPorVisitante(idVisitante) {
    return await prisma.matricula.findMany({
      where: { id_visitante_fk: parseInt(idVisitante) },
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

  async actualizar(matricula, data) {
    return await prisma.matricula.update({
      where: { matricula },
      data,
      include: {
        residente: true,
        visitante: true
      }
    });
  }

  async eliminar(matricula) {
    return await prisma.matricula.delete({
      where: { matricula }
    });
  }
}

module.exports = new MatriculaService();

const prisma = require('../../config/prisma');

class ResidenteService {
  async crear(data) {
    return await prisma.residente.create({
      data,
      include: {
        departamento: true,
        edificio: true,
        usuario: true
      }
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
    return await prisma.residente.delete({
      where: { id_residente: parseInt(id) }
    });
  }
}

module.exports = new ResidenteService();

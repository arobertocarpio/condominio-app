const prisma = require('../../config/prisma');

class DepartamentoService {
  async crear(data) {
    return await prisma.departamento.create({
      data,
      include: {
        edificio: true
      }
    });
  }

  async obtenerTodos() {
    return await prisma.departamento.findMany({
      include: {
        edificio: true,
        residentes: true,
        cajones: true,
        visitantes: true
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.departamento.findUnique({
      where: { id_departamento: parseInt(id) },
      include: {
        edificio: true,
        residentes: true,
        cajones: true,
        visitantes: true
      }
    });
  }

  async obtenerPorEdificio(idEdificio) {
    return await prisma.departamento.findMany({
      where: { id_edificio_fk: parseInt(idEdificio) },
      include: {
        residentes: true,
        cajones: true
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.departamento.update({
      where: { id_departamento: parseInt(id) },
      data,
      include: {
        edificio: true
      }
    });
  }

  async eliminar(id) {
    return await prisma.departamento.delete({
      where: { id_departamento: parseInt(id) }
    });
  }
}

module.exports = new DepartamentoService();

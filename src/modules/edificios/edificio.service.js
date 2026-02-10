const prisma = require('../../config/prisma');

class EdificioService {
  async crear(data) {
    return await prisma.edificio.create({
      data
    });
  }

  async obtenerTodos() {
    return await prisma.edificio.findMany({
      include: {
        departamentos: true,
        residentes: true,
        visitantes: true
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.edificio.findUnique({
      where: { id_edificio: parseInt(id) },
      include: {
        departamentos: true,
        residentes: true,
        visitantes: true
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.edificio.update({
      where: { id_edificio: parseInt(id) },
      data
    });
  }

  async eliminar(id) {
    return await prisma.edificio.delete({
      where: { id_edificio: parseInt(id) }
    });
  }
}

module.exports = new EdificioService();

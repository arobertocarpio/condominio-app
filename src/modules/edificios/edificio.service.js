const prisma = require('../../config/prisma');

class EdificioService {
  async crear(data) {
    return await prisma.edificio.create({
      data: {
        num_edificio: parseInt(data.num_edificio),
      }
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
    const updateData = { ...data };
    if (data.num_edificio !== undefined) {
      updateData.num_edificio = parseInt(data.num_edificio);
    }
    return await prisma.edificio.update({
      where: { id_edificio: parseInt(id) },
      data: updateData
    });
  }

  async eliminar(id) {
    return await prisma.edificio.delete({
      where: { id_edificio: parseInt(id) }
    });
  }
}

module.exports = new EdificioService();

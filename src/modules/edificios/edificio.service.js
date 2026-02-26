const prisma = require('../../config/prisma');

class EdificioService {
  async crear(data) {
    const noEdificio = Number(data.num_edificio);
    if (isNaN(noEdificio)) {
      throw new Error('El número de edificio debe ser un valor numérico');
    }

    return await prisma.edificio.create({
      data: {
        ...data,
        num_edificio: noEdificio
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

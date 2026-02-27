const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

class PasswordService {
  async cambiar(idUsuario, nuevaPassword) {
    const id = parseInt(idUsuario);


    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: id }
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const passwordHash = await bcrypt.hash(nuevaPassword, 10);

    await prisma.usuario.update({
      where: { id_usuario: id },
      data: {
        password: passwordHash
      }
    });

    return {
      message: 'Contraseña actualizada correctamente'
    };
  }
}

module.exports = new PasswordService();
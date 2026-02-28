const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

class PasswordService {
  async cambiarPorEmail(email, nuevaPassword) {
    const usuario = await prisma.usuario.findUnique({
      where: { correo: email }
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const passwordHash = await bcrypt.hash(nuevaPassword, 10);

    await prisma.usuario.update({
      where: { id_usuario: usuario.id_usuario },
      data: { password: passwordHash }
    });

    return {
      message: 'Contraseña actualizada correctamente'
    };
  }
}

module.exports = new PasswordService();
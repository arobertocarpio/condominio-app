require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando creación de usuarios admin...');

  const admins = [
    { correo: 'admin@condominio.com',  password: 'Admin123!', nombre: 'Admin 1' },
    { correo: 'admin2@condominio.com', password: 'Admin123!', nombre: 'Admin 2' },
    { correo: 'admin3@condominio.com', password: 'Admin123!', nombre: 'Admin 3' },
  ];

  for (const { correo, password, nombre } of admins) {
    console.log(`\nProcesando ${correo}...`);

    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) {
      console.log('Usuario ya existe. Verificando perfil de administrador...');
      const admin = await prisma.administrador.findFirst({
        where: { id_usuario_fk: existe.id_usuario },
      });
      if (admin) {
        console.log('Administrador ya existe, nada que hacer.');
        continue;
      }
      const nuevoAdmin = await prisma.administrador.create({
        data: { id_usuario_fk: existe.id_usuario, nombre },
      });
      console.log('Perfil administrador creado:', nuevoAdmin);
      continue;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await prisma.usuario.create({
      data: {
        correo,
        password: hashedPassword,
        rol: 'ADMINISTRADOR',
      },
    });

    await prisma.administrador.create({
      data: {
        id_usuario_fk: usuario.id_usuario,
        nombre,
      },
    });

    console.log('Usuario admin creado correctamente:');
    console.log('  Correo:', correo);
    console.log('  Contraseña: Admin123!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

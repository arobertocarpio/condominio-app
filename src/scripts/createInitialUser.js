const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

async function createInitialUser() {
    try {
        // Verificar si ya existe un usuario
        const existingUser = await prisma.usuario.findFirst();
        
        if (existingUser) {
            console.log('❌ Ya existe un usuario en la base de datos');
            return;
        }

        // Datos del usuario inicial
        const userData = {
            correo: 'admin@condominio.com',
            password: await bcrypt.hash('Admin123!', 10),
            rol: 'ADMINISTRADOR'
        };

        // Crear usuario
        const usuario = await prisma.usuario.create({
            data: userData
        });

        console.log('✅ Usuario inicial creado exitosamente:');
        console.log('   📧 Correo:', usuario.correo);
        console.log('   🔑 Contraseña: admin123');
        console.log('   👤 Rol:', usuario.rol);
        console.log('   🆔 ID:', usuario.id_usuario);

    } catch (error) {
        console.error('❌ Error al crear usuario:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

createInitialUser();

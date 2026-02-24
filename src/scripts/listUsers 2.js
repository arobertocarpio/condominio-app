const prisma = require('../config/prisma');

async function listUsers() {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id_usuario: true,
                correo: true,
                rol: true,
                fecha_registro: true
            }
        });

        console.log('\n📋 Usuarios en la base de datos:\n');
        
        if (usuarios.length === 0) {
            console.log('❌ No hay usuarios en la base de datos');
        } else {
            usuarios.forEach((usuario, index) => {
                console.log(`${index + 1}. Usuario #${usuario.id_usuario}`);
                console.log(`   📧 Correo: ${usuario.correo}`);
                console.log(`   👤 Rol: ${usuario.rol || 'Sin rol'}`);
                console.log(`   📅 Registrado: ${usuario.fecha_registro}`);
                console.log('');
            });
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

listUsers();

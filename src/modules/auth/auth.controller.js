const prisma = require('../../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { correo } });
        if (!usuario) return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos.' });

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos.' });

        const token = jwt.sign(
            { id: usuario.id_usuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({ 
            token,
            usuario: {
                id: usuario.id_usuario,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

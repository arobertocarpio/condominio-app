const prisma = require('../../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos.' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos.' });


    const token = jwt.sign(
        { id: user.id, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    res.json({ token });
};

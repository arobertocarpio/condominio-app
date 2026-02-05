const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../users/user.model');

exports.register = async (data) => {
    const exist = users.find(u => u.email === data.email);
    if (exist) throw new Error('Ya hay un usuario registrado con ese correo.');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
        id: users.length + 1,
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
    };

    users.push(newUser);
    return { 
        id: newUser.id, 
        email: newUser.email, 
        name: newUser.name, 
        role: newUser.role 
    };
};

exports.login = async (data) => {
    if (!data.email || !data.password) {
        throw new Error('Correo y contraseña son obligatorios.');
    }

    const email = data.email.toLowerCase();
    const user = users.find(u => u.email === email);
    if (!user) {
        throw new Error('Correo o contraseña incorrectos.');
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
        throw new Error('Correo o contraseña incorrectos.');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, role: user.role };
};

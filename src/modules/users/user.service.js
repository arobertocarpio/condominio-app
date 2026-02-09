const prisma = require('../../config/prisma');
const bcrypt = require('bcrypt');

const register = async ({ name, email, password, role }) => {

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
        throw new Error('Ya hay un usuario con ese correo electrónico.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
            role
        }
    });

    return user;

};

module.exports = {
    register
};
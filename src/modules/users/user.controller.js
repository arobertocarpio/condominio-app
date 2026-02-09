const { register } = require('./user.service');

exports.register = async (req, res) => {
    try {
        const user = await register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al crear el usuario', error 
        });
    }
};
const authService = require('./auth.service');

exports.register = async (req, res) => {
    try {
        const usuario = await authService.register(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        const status = error.message.includes('Ya hay un usuario') ? 409 : 500;
        res.status(status).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        const status = error.message.includes('bloqueada') ? 423 : 400;
        res.status(status).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const usuario = await authService.getProfile(req.user.id);
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.cambiarPassword = async (req, res) => {
    try {
        const result = await authService.cambiarPassword(req.user.id, req.body);
        res.json(result);
    } catch (error) {
        const status = error.message.includes('incorrecta') ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

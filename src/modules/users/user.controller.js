const userService = require('./user.service');

exports.obtenerTodos = async (req, res) => {
    try {
        const usuarios = await userService.obtenerTodos();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

exports.obtenerPorId = async (req, res) => {
    try {
        const usuario = await userService.obtenerPorId(parseInt(req.params.id));
        res.json(usuario);
    } catch (error) {
        const status = error.message.includes('no encontrado') ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        const status = error.message.includes('Ya hay un usuario') ? 409 : 500;
        res.status(status).json({ message: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        const usuario = await userService.actualizar(parseInt(req.params.id), req.body);
        res.json(usuario);
    } catch (error) {
        const status = error.message.includes('no encontrado') ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await userService.eliminar(parseInt(req.params.id));
        res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        const status = error.message.includes('no encontrado') ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

exports.bloquear = async (req, res) => {
    try {
        const usuario = await userService.bloquear(parseInt(req.params.id));
        res.json(usuario);
    } catch (error) {
        const status = error.message.includes('no encontrado') ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

exports.desbloquear = async (req, res) => {
    try {
        const usuario = await userService.desbloquear(parseInt(req.params.id));
        res.json(usuario);
    } catch (error) {
        const status = error.message.includes('no encontrado') ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};
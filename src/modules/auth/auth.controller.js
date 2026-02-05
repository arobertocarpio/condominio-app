const service_auth = require('./auth.service');

exports.register = async (req, res) => {
    try {
        const userData = await service_auth.register(req.body);
        res.status(201).json(userData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const loginData = await service_auth.login(req.body);
        res.status(200).json(loginData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
};

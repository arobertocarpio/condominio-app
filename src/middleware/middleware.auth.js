const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No autorizado.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

const requireRole = (roles = []) => {
    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Acceso denegado.' });
        }
        next();
    };
};

module.exports = authMiddleware;
module.exports.requireRole = requireRole;

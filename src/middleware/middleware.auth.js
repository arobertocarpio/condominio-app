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

// Mapa de alias para normalizar roles (BD puede tener ADMINISTRADOR, admin, Admin, etc.)
const ROLE_ALIASES = {
    'administrador': 'admin',
    'residente': 'residente',
    'vigilante': 'vigilante',
};

const normalizeRole = (rol) => {
    if (!rol) return null;
    const lower = rol.toLowerCase();
    return ROLE_ALIASES[lower] || lower;
};

const requireRole = (roles = []) => {
    return (req, res, next) => {
        const userRole = normalizeRole(req.user.rol);
        const allowedRoles = roles.map(r => r.toLowerCase());

        if (allowedRoles.length && !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Acceso denegado.' });
        }
        next();
    };
};

module.exports = authMiddleware;
module.exports.requireRole = requireRole;

const jwt = require('jsonwebtoken');

exports.auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.header.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No autorizado.' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Acceso denegado.' });
            }

            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
    };
};

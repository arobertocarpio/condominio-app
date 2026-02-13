const router = require('express').Router();
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');
const userController = require('./user.controller');

// Ruta pública
router.post('/register', userController.register);

// Rutas protegidas (solo admin)
router.get('/', authMiddleware, requireRole(['admin']), userController.obtenerTodos);
router.get('/:id', authMiddleware, requireRole(['admin']), userController.obtenerPorId);
router.put('/:id', authMiddleware, requireRole(['admin']), userController.actualizar);
router.delete('/:id', authMiddleware, requireRole(['admin']), userController.eliminar);
router.patch('/:id/bloquear', authMiddleware, requireRole(['admin']), userController.bloquear);
router.patch('/:id/desbloquear', authMiddleware, requireRole(['admin']), userController.desbloquear);

module.exports = router;
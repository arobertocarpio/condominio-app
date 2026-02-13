const express = require('express');
const router = express.Router();
const edificioController = require('./edificio.controller');
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, requireRole(['admin']), edificioController.crear);
router.get('/', authMiddleware, edificioController.obtenerTodos);
router.get('/:id', authMiddleware, edificioController.obtenerPorId);
router.put('/:id', authMiddleware, requireRole(['admin']), edificioController.actualizar);
router.delete('/:id', authMiddleware, requireRole(['admin']), edificioController.eliminar);

module.exports = router;

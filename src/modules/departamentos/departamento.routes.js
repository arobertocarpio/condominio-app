const express = require('express');
const router = express.Router();
const departamentoController = require('./departamento.controller');
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, requireRole(['admin']), departamentoController.crear);
router.get('/', authMiddleware, departamentoController.obtenerTodos);
router.get('/edificio/:idEdificio', authMiddleware, departamentoController.obtenerPorEdificio);
router.get('/:id', authMiddleware, departamentoController.obtenerPorId);
router.put('/:id', authMiddleware, requireRole(['admin']), departamentoController.actualizar);
router.delete('/:id', authMiddleware, requireRole(['admin']), departamentoController.eliminar);

module.exports = router;

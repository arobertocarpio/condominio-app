const express = require('express');
const router = express.Router();
const departamentoController = require('./departamento.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, departamentoController.crear);
router.get('/', authMiddleware, departamentoController.obtenerTodos);
router.get('/:id', authMiddleware, departamentoController.obtenerPorId);
router.get('/edificio/:idEdificio', authMiddleware, departamentoController.obtenerPorEdificio);
router.put('/:id', authMiddleware, departamentoController.actualizar);
router.delete('/:id', authMiddleware, departamentoController.eliminar);

module.exports = router;

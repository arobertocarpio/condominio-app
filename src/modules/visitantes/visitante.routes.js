const express = require('express');
const router = express.Router();
const visitanteController = require('./visitante.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, visitanteController.crear);
router.get('/', authMiddleware, visitanteController.obtenerTodos);
router.get('/activos', authMiddleware, visitanteController.obtenerActivos);
router.get('/:id', authMiddleware, visitanteController.obtenerPorId);
router.get('/departamento/:idDepartamento', authMiddleware, visitanteController.obtenerPorDepartamento);
router.get('/categoria/:categoria', authMiddleware, visitanteController.obtenerPorCategoria);
router.put('/:id', authMiddleware, visitanteController.actualizar);
router.patch('/:id/desactivar', authMiddleware, visitanteController.desactivar);
router.patch('/:id/activar', authMiddleware, visitanteController.activar);
router.delete('/:id', authMiddleware, visitanteController.eliminar);

module.exports = router;

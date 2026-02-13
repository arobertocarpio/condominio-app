const express = require('express');
const router = express.Router();
const accesoController = require('./acceso.controller');
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');

router.post('/entrada', authMiddleware, requireRole(['vigilante', 'admin']), accesoController.registrarEntrada);
router.get('/', authMiddleware, accesoController.obtenerTodos);
router.get('/activos', authMiddleware, accesoController.obtenerAccesosActivos);
router.get('/fecha', authMiddleware, accesoController.obtenerPorFecha);
router.get('/matricula/:matricula', authMiddleware, accesoController.obtenerPorMatricula);
router.get('/vigilante/:idVigilante', authMiddleware, accesoController.obtenerPorVigilante);
router.get('/:id', authMiddleware, accesoController.obtenerPorId);
router.patch('/:id/salida', authMiddleware, requireRole(['vigilante', 'admin']), accesoController.registrarSalida);
router.put('/:id', authMiddleware, requireRole(['admin']), accesoController.actualizar);
router.delete('/:id', authMiddleware, requireRole(['admin']), accesoController.eliminar);

module.exports = router;

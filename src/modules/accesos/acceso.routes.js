const express = require('express');
const router = express.Router();
const accesoController = require('./acceso.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/entrada', authMiddleware, accesoController.registrarEntrada);
router.patch('/:id/salida', authMiddleware, accesoController.registrarSalida);
router.get('/', authMiddleware, accesoController.obtenerTodos);
router.get('/activos', authMiddleware, accesoController.obtenerAccesosActivos);
router.get('/fecha', authMiddleware, accesoController.obtenerPorFecha);
router.get('/:id', authMiddleware, accesoController.obtenerPorId);
router.get('/matricula/:matricula', authMiddleware, accesoController.obtenerPorMatricula);
router.get('/vigilante/:idVigilante', authMiddleware, accesoController.obtenerPorVigilante);
router.put('/:id', authMiddleware, accesoController.actualizar);
router.delete('/:id', authMiddleware, accesoController.eliminar);

module.exports = router;

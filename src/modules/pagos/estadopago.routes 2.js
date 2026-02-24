const express = require('express');
const router = express.Router();
const estadoPagoController = require('./estadopago.controller');
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, requireRole(['admin']), estadoPagoController.crear);
router.get('/', authMiddleware, estadoPagoController.obtenerTodos);
router.get('/pendientes', authMiddleware, estadoPagoController.obtenerPendientes);
router.get('/vencidos', authMiddleware, estadoPagoController.obtenerVencidos);
router.get('/residente/:idResidente', authMiddleware, estadoPagoController.obtenerPorResidente);
router.get('/:id', authMiddleware, estadoPagoController.obtenerPorId);
router.patch('/:id/registrar', authMiddleware, requireRole(['admin']), estadoPagoController.registrarPago);
router.put('/:id', authMiddleware, requireRole(['admin']), estadoPagoController.actualizar);
router.delete('/:id', authMiddleware, requireRole(['admin']), estadoPagoController.eliminar);

module.exports = router;

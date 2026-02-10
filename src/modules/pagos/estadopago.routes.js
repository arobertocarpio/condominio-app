const express = require('express');
const router = express.Router();
const estadoPagoController = require('./estadopago.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, estadoPagoController.crear);
router.get('/', authMiddleware, estadoPagoController.obtenerTodos);
router.get('/pendientes', authMiddleware, estadoPagoController.obtenerPendientes);
router.get('/vencidos', authMiddleware, estadoPagoController.obtenerVencidos);
router.get('/:id', authMiddleware, estadoPagoController.obtenerPorId);
router.get('/residente/:idResidente', authMiddleware, estadoPagoController.obtenerPorResidente);
router.patch('/:id/registrar', authMiddleware, estadoPagoController.registrarPago);
router.put('/:id', authMiddleware, estadoPagoController.actualizar);
router.delete('/:id', authMiddleware, estadoPagoController.eliminar);

module.exports = router;

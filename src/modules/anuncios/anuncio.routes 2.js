const express = require('express');
const router = express.Router();
const anuncioController = require('./anuncio.controller');
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, requireRole(['admin']), anuncioController.crear);
router.get('/', authMiddleware, anuncioController.obtenerTodos);
router.get('/recientes', authMiddleware, anuncioController.obtenerRecientes);
router.get('/fecha', authMiddleware, anuncioController.obtenerPorFecha);
router.get('/administrador/:idAdmin', authMiddleware, anuncioController.obtenerPorAdministrador);
router.get('/:id', authMiddleware, anuncioController.obtenerPorId);
router.put('/:id', authMiddleware, requireRole(['admin']), anuncioController.actualizar);
router.delete('/:id', authMiddleware, requireRole(['admin']), anuncioController.eliminar);

module.exports = router;

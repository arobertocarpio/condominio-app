const express = require('express');
const router = express.Router();
const anuncioController = require('./anuncio.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, anuncioController.crear);
router.get('/', authMiddleware, anuncioController.obtenerTodos);
router.get('/recientes', authMiddleware, anuncioController.obtenerRecientes);
router.get('/fecha', authMiddleware, anuncioController.obtenerPorFecha);
router.get('/:id', authMiddleware, anuncioController.obtenerPorId);
router.get('/administrador/:idAdmin', authMiddleware, anuncioController.obtenerPorAdministrador);
router.put('/:id', authMiddleware, anuncioController.actualizar);
router.delete('/:id', authMiddleware, anuncioController.eliminar);

module.exports = router;

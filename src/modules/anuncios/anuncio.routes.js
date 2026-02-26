const express = require('express');
const router = express.Router();
const anuncioController = require('./anuncio.controller');
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');
const upload = require('../../config/multer');

router.post('/', authMiddleware, requireRole(['admin']), upload.single('archivo'), anuncioController.crear);
router.get('/', authMiddleware, anuncioController.obtenerTodos);
router.get('/recientes', authMiddleware, anuncioController.obtenerRecientes);
router.get('/fecha', authMiddleware, anuncioController.obtenerPorFecha);
router.get('/administrador/:idAdmin', authMiddleware, anuncioController.obtenerPorAdministrador);
router.get('/:id', authMiddleware, anuncioController.obtenerPorId);
router.put('/:id', authMiddleware, requireRole(['admin']), upload.single('archivo'), anuncioController.actualizar);
router.delete('/:id', authMiddleware, requireRole(['admin']), anuncioController.eliminar);

module.exports = router;

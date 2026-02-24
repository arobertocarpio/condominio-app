const express = require('express');
const router = express.Router();
const vigilanteController = require('./vigilante.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, vigilanteController.crear);
router.get('/', authMiddleware, vigilanteController.obtenerTodos);
router.get('/usuario/:idUsuario', authMiddleware, vigilanteController.obtenerPorUsuario);
router.get('/:id', authMiddleware, vigilanteController.obtenerPorId);
router.put('/:id', authMiddleware, vigilanteController.actualizar);
router.delete('/:id', authMiddleware, vigilanteController.eliminar);

module.exports = router;

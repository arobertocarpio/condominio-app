const express = require('express');
const router = express.Router();
const administradorController = require('./administrador.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, administradorController.crear);
router.get('/', authMiddleware, administradorController.obtenerTodos);
router.get('/:id', authMiddleware, administradorController.obtenerPorId);
router.get('/usuario/:idUsuario', authMiddleware, administradorController.obtenerPorUsuario);
router.put('/:id', authMiddleware, administradorController.actualizar);
router.delete('/:id', authMiddleware, administradorController.eliminar);

module.exports = router;

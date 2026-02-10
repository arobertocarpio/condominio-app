const express = require('express');
const router = express.Router();
const residenteController = require('./residente.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, residenteController.crear);
router.get('/', authMiddleware, residenteController.obtenerTodos);
router.get('/:id', authMiddleware, residenteController.obtenerPorId);
router.get('/departamento/:idDepartamento', authMiddleware, residenteController.obtenerPorDepartamento);
router.get('/usuario/:idUsuario', authMiddleware, residenteController.obtenerPorUsuario);
router.put('/:id', authMiddleware, residenteController.actualizar);
router.delete('/:id', authMiddleware, residenteController.eliminar);

module.exports = router;

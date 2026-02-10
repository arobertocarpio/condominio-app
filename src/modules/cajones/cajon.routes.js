const express = require('express');
const router = express.Router();
const cajonController = require('./cajon.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, cajonController.crear);
router.get('/', authMiddleware, cajonController.obtenerTodos);
router.get('/disponibles', authMiddleware, cajonController.obtenerDisponibles);
router.get('/:id', authMiddleware, cajonController.obtenerPorId);
router.get('/departamento/:idDepartamento', authMiddleware, cajonController.obtenerPorDepartamento);
router.put('/:id', authMiddleware, cajonController.actualizar);
router.delete('/:id', authMiddleware, cajonController.eliminar);

module.exports = router;

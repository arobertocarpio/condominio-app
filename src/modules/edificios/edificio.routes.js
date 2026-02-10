const express = require('express');
const router = express.Router();
const edificioController = require('./edificio.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, edificioController.crear);
router.get('/', authMiddleware, edificioController.obtenerTodos);
router.get('/:id', authMiddleware, edificioController.obtenerPorId);
router.put('/:id', authMiddleware, edificioController.actualizar);
router.delete('/:id', authMiddleware, edificioController.eliminar);

module.exports = router;

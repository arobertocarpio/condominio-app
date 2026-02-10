const express = require('express');
const router = express.Router();
const matriculaController = require('./matricula.controller');
const authMiddleware = require('../../middleware/middleware.auth');

router.post('/', authMiddleware, matriculaController.crear);
router.get('/', authMiddleware, matriculaController.obtenerTodas);
router.get('/:matricula', authMiddleware, matriculaController.obtenerPorId);
router.get('/residente/:idResidente', authMiddleware, matriculaController.obtenerPorResidente);
router.get('/visitante/:idVisitante', authMiddleware, matriculaController.obtenerPorVisitante);
router.put('/:matricula', authMiddleware, matriculaController.actualizar);
router.delete('/:matricula', authMiddleware, matriculaController.eliminar);

module.exports = router;

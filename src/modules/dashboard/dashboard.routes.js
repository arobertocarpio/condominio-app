const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard.controller');
const authMiddleware = require('../../middleware/middleware.auth');
const { requireRole } = require('../../middleware/middleware.auth');

router.get('/', authMiddleware, requireRole(['admin']), dashboardController.obtenerEstadisticas);

module.exports = router;

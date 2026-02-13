const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/middleware.auth');

const { register, login, getProfile, cambiarPassword } = require('./auth.controller.js');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/me', authMiddleware, getProfile);
router.patch('/cambiar-password', authMiddleware, cambiarPassword);

module.exports = router;
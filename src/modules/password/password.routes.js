const express = require('express');
const router = express.Router();
const passwordController = require('./password.controller');

router.put('/usuarios/password/email', passwordController.cambiarPorEmail);

module.exports = router;
const express = require('express');
const router = express.Router();
const passwordController = require('./password.controller');

router.put('/usuarios/:idUsuario/password', passwordController.cambiar);

module.exports = router;
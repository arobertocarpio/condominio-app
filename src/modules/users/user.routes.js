const router = require('express').Router();
const { auth } = require('../../middleware/middleware.auth.js');
const { register } = require('./user.controller');

router.post('/register', register);

module.exports = router;
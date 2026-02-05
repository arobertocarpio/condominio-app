const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// EN ESTE ESPACIO SE DEFINEN LAS RUTAS DE LOS SERVICIOS
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/users', require('./modules/users/user.routes'));

module.exports = app;
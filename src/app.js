const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// EN ESTE ESPACIO SE DEFINEN LAS RUTAS DE LOS SERVICIOS
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/users', require('./modules/users/user.routes'));
app.use('/api/edificios', require('./modules/edificios/edificio.routes'));
app.use('/api/departamentos', require('./modules/departamentos/departamento.routes'));
app.use('/api/residentes', require('./modules/residentes/residente.routes'));
app.use('/api/vigilantes', require('./modules/vigilantes/vigilante.routes'));
app.use('/api/visitantes', require('./modules/visitantes/visitante.routes'));
app.use('/api/administradores', require('./modules/administradores/administrador.routes'));
app.use('/api/cajones', require('./modules/cajones/cajon.routes'));
app.use('/api/matriculas', require('./modules/matriculas/matricula.routes'));
app.use('/api/accesos', require('./modules/accesos/acceso.routes'));
app.use('/api/pagos', require('./modules/pagos/estadopago.routes'));
app.use('/api/anuncios', require('./modules/anuncios/anuncio.routes'));
app.use('/api/dashboard', require('./modules/dashboard/dashboard.routes'));
app.use('/api/password', require('./modules/password/password.routes'));

module.exports = app;
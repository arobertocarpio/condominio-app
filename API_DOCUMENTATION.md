# API Sistema de Gestión de Condominios

## 📋 Configuración

### 1. Configurar Base de Datos

Edita el archivo `.env` con tu configuración de PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/condominio"
JWT_SECRET="tu_secret_key_aqui"
PORT=3000
```

### 2. Ejecutar Migraciones

```bash
npx prisma migrate dev
```

### 3. Generar Cliente Prisma

```bash
npx prisma generate
```

### 4. Iniciar el Servidor

```bash
npm start
```

## 🔐 Autenticación

Todos los endpoints (excepto login/registro) requieren JWT Bearer Token en el header:

```
Authorization: Bearer <token>
```

## 📚 Endpoints Disponibles

### 🔐 Autenticación (`/api/auth`)

- `POST /register` - Registrar nuevo usuario *(público)*
- `POST /login` - Iniciar sesión *(público)*
- `GET /me` - Obtener perfil del usuario autenticado *(auth)*
- `PATCH /cambiar-password` - Cambiar contraseña *(auth)*

**Ejemplo registro:**
```json
{
  "correo": "usuario@ejemplo.com",
  "password": "miPassword123",
  "rol": "residente"
}
```

**Ejemplo login:**
```json
{
  "correo": "usuario@ejemplo.com",
  "password": "miPassword123"
}
```

**Ejemplo cambiar contraseña:**
```json
{
  "passwordActual": "miPassword123",
  "passwordNuevo": "nuevoPassword456"
}
```

> ⚠️ Después de 5 intentos fallidos la cuenta se bloquea automáticamente.

---

### 👤 Usuarios (`/api/users`) — Solo Admin

- `POST /register` - Crear usuario *(público)*
- `GET /` - Obtener todos los usuarios *(admin)*
- `GET /:id` - Obtener usuario por ID *(admin)*
- `PUT /:id` - Actualizar usuario *(admin)*
- `DELETE /:id` - Eliminar usuario *(admin)*
- `PATCH /:id/bloquear` - Bloquear cuenta *(admin)*
- `PATCH /:id/desbloquear` - Desbloquear cuenta *(admin)*

**Ejemplo crear usuario:**
```json
{
  "correo": "nuevo@ejemplo.com",
  "password": "pass123",
  "rol": "residente"
}
```

**Roles disponibles:** `admin`, `residente`, `vigilante`

---

### 📊 Dashboard (`/api/dashboard`) — Solo Admin

- `GET /` - Obtener estadísticas generales del condominio *(admin)*

**Respuesta ejemplo:**
```json
{
  "edificios": 3,
  "departamentos": 24,
  "residentes": 45,
  "vigilantes": 4,
  "visitantes": { "total": 12, "activos": 8 },
  "cajones": { "total": 50, "disponibles": 35, "ocupados": 15 },
  "accesos": { "activos": 3, "hoy": 12 },
  "pagos": { "pendientes": 10, "vencidos": 3 },
  "anuncios": 5
}
```

---

### 🏢 Edificios (`/api/edificios`)

- `POST /` - Crear edificio
- `GET /` - Obtener todos los edificios
- `GET /:id` - Obtener edificio por ID
- `PUT /:id` - Actualizar edificio
- `DELETE /:id` - Eliminar edificio

**Ejemplo crear edificio:**
```json
{
  "num_edificio": 1
}
```

---

### 🏠 Departamentos (`/api/departamentos`)

- `POST /` - Crear departamento
- `GET /` - Obtener todos los departamentos
- `GET /:id` - Obtener departamento por ID
- `GET /edificio/:idEdificio` - Obtener departamentos por edificio
- `PUT /:id` - Actualizar departamento
- `DELETE /:id` - Eliminar departamento

**Ejemplo crear departamento:**
```json
{
  "id_edificio_fk": 1
}
```

---

### 👥 Residentes (`/api/residentes`)

- `POST /` - Crear residente
- `GET /` - Obtener todos los residentes
- `GET /:id` - Obtener residente por ID
- `GET /departamento/:idDepartamento` - Obtener residentes por departamento
- `GET /usuario/:idUsuario` - Obtener residente por usuario
- `PUT /:id` - Actualizar residente
- `DELETE /:id` - Eliminar residente

**Ejemplo crear residente:**
```json
{
  "nombre": "Juan Pérez",
  "telefono": "1234567890",
  "id_departamento_fk": 1,
  "id_edificio_fk": 1,
  "id_usuario_fk": 1
}
```

---

### 👮 Vigilantes (`/api/vigilantes`)

- `POST /` - Crear vigilante
- `GET /` - Obtener todos los vigilantes
- `GET /:id` - Obtener vigilante por ID
- `GET /usuario/:idUsuario` - Obtener vigilante por usuario
- `PUT /:id` - Actualizar vigilante
- `DELETE /:id` - Eliminar vigilante

**Ejemplo crear vigilante:**
```json
{
  "nombre": "Carlos Seguridad",
  "telefono": "9876543210",
  "id_usuario_fk": 2
}
```

---

### 🚶 Visitantes (`/api/visitantes`)

- `POST /` - Crear visitante
- `GET /` - Obtener todos los visitantes
- `GET /activos` - Obtener visitantes activos
- `GET /:id` - Obtener visitante por ID
- `GET /departamento/:idDepartamento` - Obtener visitantes por departamento
- `GET /categoria/:categoria` - Obtener visitantes por categoría
- `PUT /:id` - Actualizar visitante
- `PATCH /:id/desactivar` - Desactivar visitante
- `PATCH /:id/activar` - Activar visitante
- `DELETE /:id` - Eliminar visitante

**Ejemplo crear visitante:**
```json
{
  "nombre": "María López",
  "empresa": "Servicios ABC",
  "categoria": "proveedor",
  "id_departamento_fk": 1,
  "id_edificio_fk": 1,
  "activo": "S"
}
```

---

### 👔 Administradores (`/api/administradores`)

- `POST /` - Crear administrador
- `GET /` - Obtener todos los administradores
- `GET /:id` - Obtener administrador por ID
- `GET /usuario/:idUsuario` - Obtener administrador por usuario
- `PUT /:id` - Actualizar administrador
- `DELETE /:id` - Eliminar administrador

**Ejemplo crear administrador:**
```json
{
  "nombre": "Admin Principal",
  "id_usuario_fk": 3
}
```

---

### 🅿️ Cajones de Estacionamiento (`/api/cajones`)

- `POST /` - Crear cajón
- `GET /` - Obtener todos los cajones
- `GET /disponibles` - Obtener cajones disponibles
- `GET /:id` - Obtener cajón por ID
- `GET /departamento/:idDepartamento` - Obtener cajones por departamento
- `PUT /:id` - Actualizar cajón
- `DELETE /:id` - Eliminar cajón

**Ejemplo crear cajón:**
```json
{
  "estado": "disponible",
  "id_departamento_fk": 1
}
```

---

### 🚗 Matrículas (`/api/matriculas`)

- `POST /` - Crear matrícula
- `GET /` - Obtener todas las matrículas
- `GET /:matricula` - Obtener matrícula por número
- `GET /residente/:idResidente` - Obtener matrículas por residente
- `GET /visitante/:idVisitante` - Obtener matrículas por visitante
- `PUT /:matricula` - Actualizar matrícula
- `DELETE /:matricula` - Eliminar matrícula

**Ejemplo crear matrícula:**
```json
{
  "matricula": "ABC123",
  "id_residente_fk": 1
}
```

O para visitante:
```json
{
  "matricula": "XYZ789",
  "id_visitante_fk": 1
}
```

---

### 🚪 Accesos (`/api/accesos`)

- `POST /entrada` - Registrar entrada
- `PATCH /:id/salida` - Registrar salida
- `GET /` - Obtener todos los accesos
- `GET /activos` - Obtener accesos activos (sin salida)
- `GET /fecha?fechaInicio=...&fechaFin=...` - Obtener accesos por rango de fechas
- `GET /:id` - Obtener acceso por ID
- `GET /matricula/:matricula` - Obtener accesos por matrícula
- `GET /vigilante/:idVigilante` - Obtener accesos por vigilante
- `PUT /:id` - Actualizar acceso
- `DELETE /:id` - Eliminar acceso

**Ejemplo registrar entrada:**
```json
{
  "matricula_fk": "ABC123",
  "id_vigilante_fk": 1,
  "id_cajon_fk": 1
}
```

**Ejemplo registrar salida:**
```
PATCH /api/accesos/1/salida
```

---

### 💰 Estado de Pagos (`/api/pagos`)

- `POST /` - Crear pago
- `GET /` - Obtener todos los pagos
- `GET /pendientes` - Obtener pagos pendientes
- `GET /vencidos` - Obtener pagos vencidos
- `GET /:id` - Obtener pago por ID
- `GET /residente/:idResidente` - Obtener pagos por residente
- `PATCH /:id/registrar` - Registrar pago como completado
- `PUT /:id` - Actualizar pago
- `DELETE /:id` - Eliminar pago

**Ejemplo crear pago:**
```json
{
  "estado": "pendiente",
  "monto": 1500.00,
  "fecha_vencimiento": "2026-03-01T00:00:00Z",
  "estatus": "pendiente",
  "id_residente_fk": 1
}
```

**Ejemplo registrar pago:**
```
PATCH /api/pagos/1/registrar
```

---

### 📢 Anuncios (`/api/anuncios`)

- `POST /` - Crear anuncio
- `GET /` - Obtener todos los anuncios
- `GET /recientes?limite=10` - Obtener anuncios recientes
- `GET /fecha?fechaInicio=...&fechaFin=...` - Obtener anuncios por rango de fechas
- `GET /:id` - Obtener anuncio por ID
- `GET /administrador/:idAdmin` - Obtener anuncios por administrador
- `PUT /:id` - Actualizar anuncio
- `DELETE /:id` - Eliminar anuncio

**Ejemplo crear anuncio:**
```json
{
  "titulo": "Mantenimiento Programado",
  "mensaje": "Se realizará mantenimiento del ascensor el próximo lunes de 9am a 1pm",
  "ruta_archivo": "/uploads/mantenimiento.pdf",
  "id_admin_fk": 1
}
```

---

## 🔄 Flujo de Trabajo Común

### 1. Registrar un Residente

```bash
# 1. Crear usuario
POST /api/users
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "pass123",
  "role": "resident"
}

# 2. Crear residente vinculado al usuario
POST /api/residentes
{
  "nombre": "Juan Pérez",
  "telefono": "1234567890",
  "id_departamento_fk": 1,
  "id_edificio_fk": 1,
  "id_usuario_fk": 1
}

# 3. Registrar matrícula del residente
POST /api/matriculas
{
  "matricula": "ABC123",
  "id_residente_fk": 1
}
```

### 2. Control de Acceso

```bash
# 1. Registrar entrada (vigilante)
POST /api/accesos/entrada
{
  "matricula_fk": "ABC123",
  "id_vigilante_fk": 1,
  "id_cajon_fk": 5
}

# 2. Registrar salida cuando sale el vehículo
PATCH /api/accesos/1/salida
```

### 3. Gestión de Visitantes

```bash
# 1. Crear visitante
POST /api/visitantes
{
  "nombre": "María López",
  "empresa": "Servicios XYZ",
  "categoria": "proveedor",
  "id_departamento_fk": 1,
  "id_edificio_fk": 1
}

# 2. Registrar matrícula del visitante
POST /api/matriculas
{
  "matricula": "VIS001",
  "id_visitante_fk": 1
}

# 3. Cuando ya no es necesario, desactivar
PATCH /api/visitantes/1/desactivar
```

## 📊 Relaciones entre Entidades

```
Usuario
├── Residente
│   ├── Departamento → Edificio
│   ├── Matrícula → Accesos
│   └── EstadoPago
├── Vigilante
│   └── Accesos (registrados)
└── Administrador
    └── Anuncios

Edificio
├── Departamentos
│   ├── Cajones → Accesos
│   ├── Residentes
│   └── Visitantes
└── Visitantes
    ├── Matrícula → Accesos
    └── Accesos directos
```

## 🛠️ Tecnologías

- **Node.js** + **Express.js**
- **Prisma ORM**
- **MySQL**
- **JWT** para autenticación
- **bcrypt** para hashing de contraseñas

## 📝 Notas Importantes

1. **Autenticación**: Todos los endpoints requieren token JWT excepto login/registro
2. **Roles**: `admin`, `residente`, `vigilante` — aplicados con middleware `requireRole`
3. **Bloqueo de cuentas**: Después de 5 intentos fallidos de login, la cuenta se bloquea
4. **Prisma Client**: Se regenera automáticamente después de cambios en el schema
5. **Migraciones**: Usa `npx prisma migrate dev` para aplicar cambios al schema
6. **Estados de Visitante**: "S" = activo, "N" = inactivo
7. **Accesos Activos**: Accesos sin `hora_salida` están activos
8. **Matrículas**: Pueden pertenecer a residentes o visitantes (uno u otro)
9. **Dashboard**: Solo accesible para administradores

## 🚀 Próximos Pasos

1. Configura tu base de datos PostgreSQL
2. Actualiza el archivo `.env` con tus credenciales
3. Ejecuta `npx prisma migrate dev` para crear las tablas
4. Inicia el servidor con `npm start`
5. Prueba los endpoints con Postman o similar

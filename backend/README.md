# 📌 Mis Productos - Backend API

API REST para gestión de productos y usuarios con autenticación.

## 🚀 Setup Local

### Requisitos previos
- Node.js v18+
- MongoDB (local o Atlas)
- Git

### Instalación

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd backend

# 2. Crear archivo .env basado en .env.example
cp .env.example .env

# 3. Editar .env con tus variables
# MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname
# SESSION_SECRET=una-clave-secreta-larga-y-aleatoria
# REGISTRATION_CODE=codigo-para-registro
# ALLOWED_ORIGIN=http://localhost:4200

# 4. Instalar dependencias
npm install

# 5. Iniciar en desarrollo
npm run dev
```

## 🏃 Correr en Producción

### Variables de Entorno Requeridas
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGO_URL` | URL de MongoDB | `mongodb+srv://...` |
| `SESSION_SECRET` | Clave secreta para sesiones | `minimo-32-caracteres` |
| `REGISTRATION_CODE` | Código para registro de usuarios | `codigo123` |
| `ALLOWED_ORIGIN` | URL del frontend | `https://tudominio.com` |
| `PORT` | Puerto del servidor (opcional) | `80` |

## 📚 dependencias

| Paquete | Versión | Uso |
|---------|--------|-----|
| express | ^4.21.0 | Framework web |
| mongoose | ^8.6.2 | ODM para MongoDB |
| passport | ^0.7.0 | Autenticación |
| passport-local | ^1.0.0 | Estrategia local |
| bcrypt | ^5.1.1 | Hash de passwords |
| express-session | ^1.18.0 | Manejo de sesiones |
| connect-mongo | ^5.1.0 | Store de sesiones en MongoDB |
| helmet | ^8.1.0 | Seguridad headers |
| cors | ^2.8.6 | CORS |
| express-rate-limit | ^8.2.1 | Rate limiting |
| express-validator | ^7.x | Validación de datos |
| express- mongo-sanitize | ^2.2.0 | Previene NoSQL injection |
| dotenv | ^16.4.5 | Variables de entorno |
| zod | ^4.3.5 | Validación de esquemas |

## 📡 API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/logout` | Cerrar sesión |
| GET | `/api/auth/users` | Listar usuarios (admin) |
| PUT | `/api/auth/users/:id/rol` | Cambiar rol (admin) |
| DELETE | `/api/auth/users/:id` | Eliminar usuario (admin) |

### Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/productos` | Listar productos |
| GET | `/api/v1/productos/:id` | Ver producto |
| POST | `/api/v1/productos` | Crear producto |
| PUT | `/api/v1/productos/:id` | Editar producto |
| DELETE | `/api/v1/productos/:id` | Eliminar producto |
| GET | `/api/v1/productos/export` | Exportar CSV |

## 👥 Roles de Usuario

| Rol | Permisos |
|----|---------|
| `viewer` | Solo ver productos |
| `editor` | Ver, crear y editar productos |
| `admin` | Todos los permisos + gestión de usuarios |

## 🔒 Seguridad

- Passwords hasheados con bcrypt
- Sesiones almacenadas en MongoDB
- Rate limiting en login (5 intentos / 15 min)
- Headers seguros con Helmet
- Sanitización de MongoDB queries
- CORS configurado

## 📁 Estructura del Proyecto

```
backend/
├── controllers/     # Lógica de endpoints
├── middlewares/      # Middlewares (auth, validation, etc.)
├── models/          # Modelos Mongoose
│   └── schemas/     # Esquemas de MongoDB
├── routers/         # Rutas de la API
├── utils/           # Utilidades (DB, passport)
├── validators/     # Validaciones
├── server.js       # Entry point
├── .env.example    # Template de variables
└── package.json
```

## 🤝 Contributing

1. Fork el repo
2. Crear branch (`git checkout -b feature/nueva-funcion`)
3. Commit (`git commit -m 'Agregar nueva función'`)
4. Push (`git push origin feature/nueva-funcion`)
5. Abrir Pull Request

## 📝 Licencia

ISC
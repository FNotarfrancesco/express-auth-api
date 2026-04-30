# 📌 Mis Productos

Aplicación full-stack para gestión de productos con sistema de usuarios y roles.

## 🏗️ Arquitectura

```
├── backend/          # API REST (Express + MongoDB)
│   └── README. md     # Documentación detallada del backend
└── frontend/         # Aplicación Angular
    └── README.md      # Documentación detallada del frontend
```

## 🛠️ Tecnologías

| Componente | Tecnologías |
|------------|-------------|
| Frontend | Angular 21, TypeScript, SCSS |
| Backend | Express, Node.js, MongoDB |
| Autenticación | Passport.js, JWT, Sessions |
| Estilos | Dark Mode, Glassmorphism |

## 🚀 Quick Start

### Backend
```bash
cd backend
cp .env. example .env
npm install
npm run dev
```
### Frontend
```bash
cd frontend
npm install
npm start
```

## 👥 Roles de Usuario

| Rol | Permisos |
|----|---------|
| `viewer` | Solo ver productos |
| `editor` | Ver, crear y editar productos |
| `admin` | Todos los permisos + gestión de usuarios |

## 🔒 Seguridad

- Passwords hasheados con bcrypt
- Sesiones almacenadas en MongoDB
- Rate limiting en login
- Headers seguros con Helmet
- Sanitización de queries MongoDB
- Control de acceso por rol

## 📦 Funcionalidades

### Gestión de Productos
- Listado con filtros (categoría, disponibilidad, orden)
- Búsqueda por nombre
- Crear, editar y eliminar productos
- Exportar a CSV

### Gestión de Usuarios (admin)
- Ver lista de usuarios
- Cambiar rol (admin/editor/viewer)
- Eliminar usuarios

### Autenticación
- Login y logout
- Registro con código de invitación
- Sesiones persistentes

## 📁 Estructura de Archivos

### Backend
```
backend/
├── controllers/      # Lógica de endpoints
├── middlewares/      # Auth, validación, rate limit
├── models/          # Modelos Mongoose
├── routers/          # Rutas API
├── utils/           # DB, Passport
├── validators/      # Zod schemas
└── server.js        # Entry point
```

### Frontend
```
frontend/src/app/
├── guards/          # Route guards
├── pages/            # Login, Register, Dashboard
├── services/         # HTTP services
└── app.ts           # Root component
```

## 📡 API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/logout` | Cerrar sesión |
| GET | `/api/auth/users` | Listar usuarios |
| PUT | `/api/auth/users/:id/rol` | Cambiar rol |
| DELETE | `/api/auth/users/:id` | Eliminar usuario |

### Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/productos` | Listar productos |
| POST | `/api/v1/productos` | Crear producto |
| PUT | `/api/v1/productos/:id` | Editar producto |
| DELETE | `/api/v1/productos/:id` | Eliminar producto |
| GET | `/api/v1/productos/export` | Exportar CSV |

## 🔧 Requisitos

- Node.js v18+
- MongoDB (local o Atlas)
- npm o yarn

## 📝 Licencia

ISC
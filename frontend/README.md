# 📌 Mis Productos - Frontend

Aplicación Angular para gestión de productos con panel de administración de usuarios.

## 🚀 Setup Local

### Requisitos previos
- Node. js v18+
- npm o yarn
- Backend API corriendo en `http://localhost:80`
- MongoDB (local o Atlas)

### Instalación

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar en desarrollo
npm start
```

La app estará disponible en `http://localhost:4200`

## 🔧 Configuración

### Variables de entorno (environment.ts)
El archivo `src/environments/environment.ts` contiene la URL del API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:80/api'
}
```

### Credenciales de prueba
El sistema incluye botones de demo para login rápido:

| Rol | Email | Contraseña |
|----|-------|------------|
| Admin | `admin@example.com` | `admin123+` |
| Editor | `editor@example.com` | `editor123+` |
| Viewer | `viewer@example.com` | `viewer123+` |

> **Nota:** Estas credenciales son solo para desarrollo. Registrar nuevos usuarios requiere el código de registro configurado en el backend.

## 📂 Estructura del Proyecto

```
frontend/src/app/
├── guards/         # Route guards (auth)
├── pages/
│   ├── dashboard/   # Dashboard principal
│   ├── login/      # Página de login
│   └── register/  # Página de registro
├── services/       # Servicios HTTP
│   ├── auth. ts     # Servicio de autenticación
│   └── productos. ts # Servicio de productos
├── app. component  # Root component
├── app. routes. ts  # Rutas
└── app. config. ts  # Configuraciones
```

## 🏃 Correr en Producción

### Build
```bash
npm run build
```

Los archivos compilados se generan en `dist/`

## 📱 Funcionalidades

### Dashboard
- [x] Listado de productos con filtros
- [x] Filtro por categoría
- [x] Filtro por disponibilidad (Todos/Disponible/No disponible)
- [x] Ordenar por precio (mayor/menor) o nombre (A-Z/Z-A)
- [x] Búsqueda por nombre
- [x] Crear nuevo producto (editor/admin)
- [x] Editar producto (editor/admin)
- [x] Eliminar producto (admin)
- [x] Exportar productos a CSV (editor/admin)
- [x] Modal de confirmación para eliminar

### Panel de Administración (admin)
- [x] Ver lista de usuarios
- [x] Cambiar rol de usuario (admin/editor/viewer)
- [x] Eliminar usuario

### Login/Register
- [x] Login con email y contraseña
- [x] Registro con código de invitación
- [x] Demo login (botones para cada rol)
- [x] Mensajes de error
- [x] Modal de logout con confirmación

## 🎨 Diseño

- **Dark Mode** con tema glassmorphism
- **Responsive** (en desarrollo)
- **Paleta de colores:**
  - Fondo: `#1a1a2e` → `#16213e`
  - Cards: `rgba(255, 255, 255, 0.08)`
  - Texto: `#e4e4e7`
  - Acentos: Verde (`#28a745`), Azul (`#007bff`), Amarillo (`#ffc107`)

## 🔐 Control de Acceso por Rol

| Funcionalidad | Viewer | Editor | Admin |
|---------------|--------|--------|-------|
| Ver productos | ✅ | ✅ | ✅ |
| Usar filtros/búsqueda | ✅ | ✅ | ✅ |
| Exportar CSV | ✅ | ✅ | ✅ |
| Crear producto | ❌ | ✅ | ✅ |
| Editar producto | ❌ | ✅ | ✅ |
| Eliminar producto | ❌ | ❌ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ |

## 🛠️ Technologies

| Technology | Versión | Uso |
|-------------|--------|-----|
| Angular | 21.x | Framework frontend |
| TypeScript | 5.x | Lenguaje |
| RxJS | 7.x | Programación reactiva |
| Angular CLI | 21.x | Herramienta CLI |
| SCSS | - | Estilos |

## 🌐 Backend Requerido

Este frontend requiere el backend de Mis Productos corriendo. Ver [backend README](../backend/README.md)

## 🤝 Contributing

1. Fork el repo
2. Crear branch (`git checkout -b feature/nueva-funcion`)
3. Commit (`git commit -m 'Agregar nueva función'`)
4. Push (`git push origin feature/nueva-funcion`)
5. Abrir Pull Request

## 📝 Licencia

ISC

# Guía de Implementación

## 1. Arquitectura

El proyecto está dividido en `frontend/` (Angular), `backend/` (Express + TypeScript) y `database/` (SQL).

Flujo: Login Angular -> `POST /api/auth/login` -> Controller -> Service -> Repository -> PostgreSQL -> bcrypt -> JWT -> Angular guarda token -> interceptor agrega `Authorization: Bearer <token>` -> middleware verifica JWT -> middleware de roles autoriza.

## 2. PostgreSQL

En `psql`:

```sql
CREATE DATABASE jwt_auth;
```

Luego:

```text
\c jwt_auth
```

Ejecuta `backend/src/database/schema.sql` o `database/schema.sql`.

## 3. Backend

```bash
cd backend
npm install
```

Copia `.env.example` a `.env` y configura:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/jwt_auth
JWT_SECRET=una_clave_larga_y_aleatoria
JWT_EXPIRES_IN=1h
FRONTEND_URL=http://localhost:4200
```

Nunca subas `.env` al repositorio.

Crea los usuarios:

```bash
npm run seed
```

Credenciales de prueba:

```text
admin / Admin123! -> ADMIN
usuario / User123! -> USER
```

Levanta el backend:

```bash
npm run dev
```

API: `http://localhost:3000`.

## 4. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

Abre `http://localhost:4200`.

## 5. Módulos clave

### TokenService
Centraliza `localStorage`: `get`, `set` y `clear`. Para producción puede sustituirse por cookies `HttpOnly`, `Secure` con una estrategia CSRF adecuada.

### AuthService
Realiza login, almacena el JWT, consulta `/auth/me`, comprueba si existe sesión y ejecuta logout.

### AuthInterceptor
Adjunta automáticamente `Authorization: Bearer <JWT>` a las peticiones HTTP autenticadas. Evita duplicar esta lógica en cada servicio.

### AuthGuard
Impide navegación a rutas privadas cuando no hay token.

### RoleGuard
Comprueba el rol mediante `/api/auth/me` antes de entrar a rutas como `/admin`.

### authenticateToken
Es la barrera real del backend. Verifica firma y expiración del JWT y coloca su payload validado en `request.user`.

### requireRole
Recibe roles permitidos. `requireRole('ADMIN')` devuelve 403 si el usuario autenticado no posee ese rol.

### Controllers
Gestionan HTTP, validación básica y respuestas.

### Services
Contienen reglas de negocio y desacoplan los controladores de la persistencia.

### Repositories
Concentran las consultas PostgreSQL y evitan SQL repartido por toda la aplicación.

## 6. Endpoints

Públicos:

```text
GET  /api/health
POST /api/auth/login
```

Autenticados:

```text
GET /api/auth/me
GET /api/users/profile
```

Solo ADMIN:

```text
GET /api/users
```

## 7. Por qué existen guards y middleware

Los guards de Angular protegen la navegación y mejoran la experiencia. No son seguridad suficiente porque el cliente puede ser manipulado.

El backend es la autoridad real: verifica JWT y roles en cada endpoint protegido. Nunca debe confiarse en el rol enviado desde Angular.

`401` significa que falta una autenticación válida. `403` significa que el usuario está autenticado pero no tiene permisos.

## 8. Escalabilidad

La arquitectura permite agregar módulos como productos, inventario, pedidos, clientes, pagos y reportes sin alterar el mecanismo base de autenticación.

Antes de producción conviene añadir rate limiting para login, validación de DTOs, migraciones, refresh tokens, gestión de sesiones, auditoría, HTTPS, CORS por entorno, tests, logging seguro, manejo de secretos y una política de almacenamiento de tokens apropiada.

## 9. Prueba rápida

Administrador: entra a `/dashboard` y `/admin`.

Usuario normal: entra a `/dashboard`; el endpoint `/api/users` debe devolver 403.

Para probar el backend:

```http
POST /api/auth/login
Content-Type: application/json

{"username":"admin","password":"Admin123!"}
```

Usa el token devuelto como:

```http
Authorization: Bearer JWT...
```

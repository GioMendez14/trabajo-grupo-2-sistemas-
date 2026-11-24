# Hecho — Gestor de tareas

Aplicación web de gestión de tareas. Proyecto académico de **Sistemas y Computación I**.

## Funcionalidades
Registro, login y logout · CRUD de tareas · completar/pendiente · prioridad (baja/media/alta) · fecha de vencimiento · filtros por estado y prioridad · búsqueda por título · orden por vencimiento · dashboard con resumen · cada usuario ve solo sus tareas.

## Tecnologías
Next.js 16 (App Router) · TypeScript · React 19 · Tailwind CSS 4 · Route Handlers · PostgreSQL · Prisma 7 · Auth.js (next-auth 4, Credentials + JWT) · Zod · bcryptjs · Vitest.

## Arquitectura
```
UI (app/ + components/) → Route Handlers (app/api) → Zod (lib/validations)
   → sesión (lib/auth.ts) → lógica y datos (lib/tasks.ts) → Prisma → PostgreSQL
```
| Capa | Archivo | Responsabilidad |
|---|---|---|
| Interfaz | `src/app`, `src/components` | Mostrar datos y capturar acciones |
| API | `src/app/api/**/route.ts` | Autenticar, validar, responder con el código HTTP correcto |
| Validación | `src/lib/validations` | Esquemas Zod |
| Datos | `src/lib/tasks.ts` | Consultas Prisma, siempre filtradas por `userId` |
| Auth | `src/lib/auth.ts` | Login, hash, sesión JWT |

## Modelo de datos
`User (1) ──< (N) Task`. `Task.userId` es clave foránea obligatoria con `onDelete: Cascade`. `User.email` es único. Índices en `Task[userId, completed]` y `Task[userId, dueDate]` porque todas las consultas filtran por dueño.

## Instalación local
```bash
npm install
cp .env.example .env        # y completa los valores
npx prisma migrate dev --name init
npm run db:seed             # opcional: demo@hecho.app / demo12345
npm run dev                 # http://localhost:3000
npm test
```

## Variables de entorno
| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Conexión a PostgreSQL |
| `NEXTAUTH_SECRET` | Firma de la sesión (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL pública de la app |

## API
| Método | Ruta | Respuestas |
|---|---|---|
| POST | `/api/register` | 201, 400, 409 |
| POST | `/api/auth/callback/credentials` | Login (Auth.js) |
| GET | `/api/tasks?status=&priority=&q=&sort=` | 200, 400, 401 |
| POST | `/api/tasks` | 201, 400, 401 |
| GET | `/api/tasks/:id` | 200, 401, 404 |
| PATCH | `/api/tasks/:id` | 200, 400, 401, 404 |
| DELETE | `/api/tasks/:id` | 204, 401, 404 |

## Seguridad: riesgo → mitigación
- Contraseñas expuestas → bcrypt (12 rondas), nunca texto plano ni se devuelve el hash.
- Acceso a tareas ajenas (IDOR) → `where: { id, userId }` con el `userId` de la sesión; si no coincide, 404.
- SQL Injection → Prisma parametriza todas las consultas.
- Datos maliciosos → Zod valida en el servidor (el cliente solo mejora la UX).
- Enumeración de usuarios → el login falla con el mismo mensaje si el correo o la contraseña son incorrectos.
- Secretos → solo en variables de entorno; `.env` está en `.gitignore`.
- Errores → el detalle técnico va al log, el cliente recibe un mensaje genérico.
- XSS → React escapa el contenido; no se usa `dangerouslySetInnerHTML`.
- No cubierto (mejora futura): límite de intentos de login (rate limiting).

## Despliegue (Vercel + Neon)
1. Crea una base en [neon.tech](https://neon.tech) y copia la connection string.
2. Sube el repo a GitHub e impórtalo en Vercel.
3. En Vercel → Settings → Environment Variables: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
4. Aplica las migraciones a Neon una vez, desde tu PC: `DATABASE_URL="<url de Neon>" npx prisma migrate deploy`.
5. Deploy. El build ejecuta `prisma generate && next build`.

Errores comunes: `PrismaClientInitializationError` → revisa `DATABASE_URL`; sesión que no inicia → falta `NEXTAUTH_SECRET` o `NEXTAUTH_URL` es incorrecta; tablas inexistentes → falta `migrate deploy`.

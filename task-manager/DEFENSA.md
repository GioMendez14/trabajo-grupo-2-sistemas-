# Guía para la defensa oral

Respuestas base: cámbialas por tus palabras.

**¿Por qué Next.js?** Frontend y API en un solo proyecto y un solo despliegue; evita montar un backend aparte para una app pequeña.
**¿Por qué PostgreSQL?** Base relacional: User y Task se relacionan con clave foránea, y Postgres garantiza esa integridad.
**¿Por qué Prisma?** Esquema tipado, migraciones y consultas parametrizadas (evita SQL Injection).
**¿Por qué TypeScript?** Detecta errores antes de ejecutar; los tipos documentan el código.
**¿Qué es una API REST?** Recursos con URL (`/api/tasks`) y verbos HTTP (GET leer, POST crear, PATCH editar, DELETE borrar) con códigos de estado.
**¿Autenticación vs autorización?** Autenticación: ¿quién eres? (login). Autorización: ¿qué puedes hacer? (solo tus tareas).
**¿Cómo proteges las contraseñas?** bcrypt con salt: se guarda el hash, no la contraseña, y no se puede revertir.
**¿Qué pasa si un usuario modifica la tarea de otro?** La consulta busca por `id` y `userId` de la sesión; no encuentra nada y responde 404.
**¿Qué es una clave foránea?** Una columna que apunta a la clave primaria de otra tabla: `Task.userId` → `User.id`.
**¿Relación User–Task?** Uno a muchos: un usuario tiene muchas tareas; cada tarea pertenece a un solo usuario.
**¿Cómo funciona un POST?** El cliente envía JSON; el servidor autentica, valida con Zod, guarda con Prisma y responde 201 con la tarea creada.
**¿Cómo funciona el CRUD?** Create = POST, Read = GET, Update = PATCH, Delete = DELETE, todos filtrados por usuario.
**¿Qué medidas de seguridad implementaste?** Hash, sesión JWT en cookie httpOnly, rutas protegidas, Zod, control por `userId`, secretos en variables de entorno, errores genéricos.
**¿Dónde están los secretos?** En `.env` local y en las variables de entorno de Vercel; nunca en el repositorio.
**¿Cómo desplegaste?** GitHub → Vercel; base de datos en Neon; `prisma migrate deploy` para crear las tablas.
**¿Qué pasa al eliminar una tarea?** DELETE con confirmación en pantalla; se borra solo esa fila. Si se borrara el usuario, sus tareas se borran en cascada.
**¿Y si la base de datos no responde?** Prisma lanza error; el handler lo registra y devuelve 500 genérico; la interfaz muestra un mensaje y la app no se cae.

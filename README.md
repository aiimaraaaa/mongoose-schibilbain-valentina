# mongoose-schibilbain-valentina

- **Embebido (`Profile.preferences`)**: Se utilizó un subdocumento para las preferencias del usuario (idioma, tema, notificaciones) porque son datos pequeños, que pertenecen exclusivamente al perfil y siempre se consultan juntos. Al ser una relación de composición, no crece indefinidamente.
- **Referenciado (`User` ↔ `Profile`, 1:1)**: Se usó referencia porque el perfil puede existir conceptualmente separado de los datos de autenticación, manteniendo los documentos más chicos y limpios.
- **Referenciado (`User` → `Project`, 1:N)**: Un proyecto existe independientemente del usuario (puede reasignarse a otro líder), y un usuario puede tener muchos proyectos.
- **Referenciado (`Project` ↔ `Technology`, N:M)**: Una tecnología existe independientemente y puede estar en muchos proyectos. Evita la duplicación de datos.

## Endpoints

### Users
- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Profiles
- `POST /api/profiles`
- `GET /api/profiles`
- `GET /api/profiles/:id`
- `PUT /api/profiles/:id`
- `DELETE /api/profiles/:id`

### Projects
- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/projects/:projectId/technologies/:technologyId` (Vincular N:M)

### Technologies
- `POST /api/technologies`
- `GET /api/technologies` (Incluye populate inverso de projects)
- `GET /api/technologies/:id`
- `PUT /api/technologies/:id`
- `DELETE /api/technologies/:id`

## Justificación de Investigaciones (Consigna)

1. **Populate desde colecciones sin referencias**: En `Technology` no se guarda el ID del proyecto. Se utilizó un `virtual()` de Mongoose que busca en la colección `Project` los documentos cuyo array `technologies` contenga el ID de la tecnología actual.
2. **Eliminación lógica y en cascada**: En `Profile` se implementó eliminación lógica usando un campo `deleted_at`. En `User`, se implementó eliminación en cascada: al borrar un usuario, se borra primero su perfil asociado para no dejar registros huérfanos.
3. **N:M**: El endpoint `POST /api/projects/:projectId/technologies/:technologyId` valida que ambos documentos existan y utiliza `$addToSet` para agregar la tecnología al array sin generar duplicados.

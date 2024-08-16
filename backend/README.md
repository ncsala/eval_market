# MagicLog Marketplace Backend

Este es el backend para el Marketplace de MagicLog, implementado utilizando TypeScript, Express, y siguiendo los principios de la arquitectura hexagonal.

## Estructura del Proyecto

El proyecto sigue una arquitectura hexagonal (también conocida como Ports and Adapters) con la siguiente estructura:

```
src/
├── domain/
│   ├── entities/
│   └── ports/
│       ├── repositories/
│       └── services/
├── application/
│   └── services/
└── infrastructure/
    ├── adapters/
    │   └── http/
    │       ├── controllers/
    │       ├── routes/
    │       └── middlewares/
    ├── config/
    ├── models/
    └── repositories/
```

- `domain`: Contiene las entidades del negocio y los puertos (interfaces).
- `application`: Contiene la lógica de aplicación y los servicios.
- `infrastructure`: Contiene las implementaciones concretas, configuraciones y adaptadores.

## Tecnologías Utilizadas

- Node.js
- TypeScript
- Express.js
- Sequelize (ORM)
- PostgreSQL
- JWT para autenticación

## Requisitos Previos

- Node.js (versión 14 o superior)
- PostgreSQL

## Configuración

1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   cd magiclog-marketplace-backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   DB_NAME=magiclog_marketplace
   DB_USER=tu_usuario_de_postgres
   DB_PASSWORD=tu_contraseña_de_postgres
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=tu_secreto_jwt
   PORT=3000
   ```

4. Asegúrate de que PostgreSQL esté en ejecución y que las credenciales en el archivo `.env` sean correctas.

## Ejecución

Para iniciar el servidor en modo de desarrollo:

```
npm run dev
```

El servidor se iniciará en `http://localhost:3000` (o el puerto especificado en tu archivo `.env`).

## Rutas API

Actualmente, la API soporta las siguientes rutas:

- `POST /auth/register`: Registra un nuevo usuario
- `POST /auth/login`: Inicia sesión de un usuario existente

## Desarrollo

### Agregar Nuevas Entidades

1. Crea una nueva entidad en `src/domain/entities/`
2. Define el puerto (interfaz) del repositorio en `src/domain/ports/repositories/`
3. Implementa el modelo Sequelize en `src/infrastructure/models/`
4. Crea la implementación del repositorio en `src/infrastructure/repositories/`

### Agregar Nuevos Servicios

1. Define la interfaz del servicio en `src/domain/ports/services/`
2. Implementa el servicio en `src/application/services/`

### Agregar Nuevas Rutas

1. Crea un nuevo controlador en `src/infrastructure/adapters/http/controllers/`
2. Define las nuevas rutas en `src/infrastructure/adapters/http/routes/`
3. Actualiza `src/app.ts` para incluir las nuevas rutas

## Testing

(Nota: Implementar tests es una tarea pendiente)

Para ejecutar los tests (una vez implementados):

```
npm test
```
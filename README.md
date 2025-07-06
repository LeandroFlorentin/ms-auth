# Microservicio de Autenticación

## Este microservicio se encarga de la autenticación de usuarios mediante validación de credenciales, emisión de tokens JWT y de sesiones activas. <br/>El desarrollo del servicio sigue los principios de arquitectura limpia (Clean Architecture), separando responsabilidades en capas como domain, application, infrastructure e interfaces, lo que facilita el mantenimiento, la escalabilidad y la capacidad de testing.

### Tecnologías utilizadas:

- Lenguaje de programación.
  - **TypeScript:** para garantizar tipado estático y mayor mantenibilidad del código.
- Frameworks.
  - **Express:** para construir las rutas HTTP y manejar las solicitudes de login, registro y validación de tokens.
- Bases de datos.
  - **PostgresSQL:** para persistir los datos de usuarios registrados.
  - **Redis:** para cachear usuarios autenticados, mejorando la velocidad de respuesta en validaciones.
- Orm
  - **Sequelize:** para mapear modelos relacionales de PostgreSQL en código JavaScript/TypeScript y facilitar las consultas.
- Testing
  - **Jest:** para pruebas unitarias de funciones críticas como validación y generación de tokens.
  - **Supertest:** para pruebas de integración sobre los endpoints expuestos (e.g. /login, /register).
- Librerias
  - **JWT:** (jsonwebtoken): para la generación y validación de tokens de acceso.
  - **Swagger:** para documentar las rutas y facilitar pruebas manuales del servicio.
  - **Winston:** para el logging estructurado y centralizado de errores, advertencias y eventos del sistema.
  - **Bcrypt:** para el hash y la comparación segura de contraseñas.

# Tabla de contenidos:

- [Instalación](#instalación)
- [Referencia de API](#referencia-de-api)
- [Autores](#autores)

# Instalación

Clona el repositorio en tu entorno local con el siguiente comando

```
   git clone https://github.com/LeandroFlorentin/ms-auth.git
```

Una vez clonado, navega dentro del repositorio e instala las dependencias con el comando install de npm o yarn respectivamente.

Puedes buscar el dialec correspondiente a la base de datos que desees utilizar en la [documentación de Sequelize.](https://sequelize.org/docs/v6/getting-started/)

Una vez tengas tu dialect crea el archivo .env en la raiz del proyecto y ponle tus credenciales.

**Aclaracion** Este microservicio de dependiente del microservicio de usuarios, ya que este el ms-usuarios es el encargado de crear los usuarios que se autentícan aqui, para conocer mas de este microservicio revise este [repositorio](https://github.com/LeandroFlorentin/ms-users)

```env
    PORT=<YOUR_PORT>

    DB_USER=<YOUR_DB_USER>
    DB_PASSWORD=<YOUR_DB_PASSWORD>
    DB_HOST=<YOUR_DB_HOST>
    DB_DIALECT=<YOUR_DB_DIALECT>
    DB_NAME=<YOUR_DB_NAME>
    DB_PORT=<YOUR_DB_PORT>

    RD_PASSWORD=<YOUR_REDIS_PASSWORD>
    RD_PORT=<YOUR_REDIS_PORT>
    RD_HOST=<YOUR_REDIS_HOST>

    JWT_SECRET=<YOUR_JWT_SECRET>
    EXPIRATION_TIME=<YOUR_EXPIRATION_TIME> //example: 1h

    URL_BASE=<YOUR_URL_BASE> //example: http://localhost:
    MS_USERS_URL=<YOUR_MS_USERS_URL> //example: http://localhost:3001
```

# Referencia de API

sdfgdgfdgdf

# Autores

LEANDRO FLORENTIN

# Explicación de las carpetas de mi proyecto

## Orden a desarrollar

1. **domain/**
   - Tipos (entidades): User, etc.
   - Reglas de negocio puras (funciones)
   - Interfaces de repositorio (UserRepository)

2. **application/**
   - Casos de uso (loginUser, registerUser)
   - DTOs de entrada/salida

3. **infrastructure/**
   - Modelos DB (user.model.ts)
   - Implementación de repositorios (user.repository.impl.ts)
   - Servicios externos (JWT, mail, etc.)

4. **interfaces/**
   - Controladores Express
   - Rutas
   - Middlewares (JWT, errores, etc.)

5. **config/**
   - Configs separadas (JWT, DB, Logger)
   - Lectura de .env

6. **shared/**
   - Helpers (hashPassword)
   - Errores personalizados
   - Constantes y tipos globales

7. **tests (ideal)**
   - Unitarios: domain/, application/
   - Integración: infrastructure/, endpoints

---

## CONFIG

Centraliza la configuración del entorno.  
En esta carpeta se separa por cada archivo la configuración, ya sea de AWS, los environments de la base de datos, CORS para orígenes permitidos, métodos y headers, etc.

---

## DOMAIN

- **Entidades**  
  Representan objetos clave del dominio (ej: `User`, `Product`).

- **Interfaces de Repositorio**  
  Contratos que definen las operaciones necesarias sobre las entidades.  
  No contienen implementación, solo firma.  
  Ejemplo: `user.repository.ts`

- **Lógica de negocio pura**  
  Reglas que aplican al dominio, sin side effects (ni DB, ni HTTP).  
  Puedes separarlas si son muchas en archivos como `user.service.ts`.

- **Validaciones**  
  Validaciones de dominio (ej: formato de email, restricciones de campos).  
  Ejemplo: `validation.ts`

- **Tipos y enums del dominio**  
  Tipos personalizados (ej: `UserRole`, `Status`, etc.).

---

## INFRASTRUCTURE

**¿Qué va dentro?**

- **Modelos de base de datos**  
  (Sequelize, Prisma, TypeORM, etc.)  
  Ejemplo: `models/user.model.ts`

- **Implementaciones de Repositorios**  
  Implementan las interfaces del domain, conectándose a la base de datos o fuentes externas.  
  Ejemplo: `user.repository.impl.ts`

- **Servicios externos**  
  AWS, correo, JWT, Redis, Stripe, etc.  
  Ejemplo: `jwt.service.ts`, `mail.service.ts`, `aws.service.ts`

- **Configuración e inicialización técnica**  
  Inicialización de Sequelize, conexión a la base, setup de Redis, etc.  
  Ejemplo: `database/index.ts`

- **Gateways / adaptadores de infraestructura**  
  Si interactúas con APIs externas, websockets, colas (Kafka, RabbitMQ), etc.

---

## INTERFACES

La carpeta `interfaces/` es la capa de entrada/salida de tu aplicación.

Es donde se conecta el mundo externo (HTTP, CLI, GraphQL, WebSocket, etc.) con tu lógica de negocio.  
Si usas Express, esta carpeta maneja rutas, controladores, middlewares, y traduce las requests a lo que entiende `application/`.

**¿Qué va dentro?**

- **Controladores**  
  Traducen HTTP → lógica de negocio (use cases).  
  Se encargan de recibir el request, ejecutar un caso de uso y devolver una respuesta.  
  Ejemplo: `auth.controller.ts`, `user.controller.ts`

- **Rutas**  
  Definen los endpoints y los vinculan con los controladores.  
  Ejemplo: `auth.routes.ts`, `user.routes.ts`

- **Middlewares**  
  Lógica transversal: autenticación, validación de entrada, manejo de errores, etc.  
  Ejemplo: `auth.middleware.ts`, `validateBody.middleware.ts`

- **(Opcional) Adaptadores**

---

## APPLICATION

La carpeta `application/` es la capa donde viven los casos de uso del negocio:  
Las acciones específicas que puede ejecutar tu sistema, como registrar usuario, iniciar sesión, crear pedido, etc.

Esta capa usa las entidades del `domain/` y depende de las interfaces (repositorios) que definiste allí.  
No sabe nada de Express, Sequelize, JWT, etc. — solo del dominio y sus reglas.

**¿Qué va dentro?**

- **Casos de uso**  
  Funciones que representan acciones de negocio.  
  Coordinan entidades + repositorios para cumplir una acción.  
  Ejemplo: `loginUser.ts`, `registerUser.ts`, `getUserById.ts`

- **DTOs (Data Transfer Objects)**  
  Interfaces para definir la forma esperada de entrada y salida de datos.  
  Ejemplo: `LoginDTO`, `RegisterDTO`, etc.

- **(Opcional) Servicios de aplicación**  
  Si necesitas lógica más compleja y compartida entre casos de uso, puedes agregar `userApplicationService.ts`, etc.

---

## SHARED

La carpeta `shared/` (a veces llamada `common/` o `utils/`) contiene código reutilizable y transversal que no pertenece a un dominio específico, pero es útil en varias capas de la app (`application`, `interfaces`, `infrastructure`).

**¿Qué va dentro?**

- **Utilidades generales**  
  Funciones pequeñas y puras que se usan en varios lugares.  
  Ejemplo: `generateRandomId()`, `slugify()`, `formatDate()`

- **Manejo de errores personalizados**  
  Clases o funciones para lanzar errores significativos (ej: `HttpException`, `ValidationError`).  
  Ideal para lanzar desde casos de uso o controladores.

- **Tipos globales**  
  Tipos o interfaces reutilizables, como `Paginated<T>`, `ID`, `UUID`, etc.

- **Constantes**  
  Códigos de error, nombres de roles, estados, etc.  
  Ejemplo: `errorCodes.ts`, `userRoles.ts`

- **Helpers criptográficos, de fechas, validadores**  
  Ejemplo: `hashPassword()`, `comparePassword()`, `isUUID()`, `isEmailValid()`

---

## 🗂️ Estructura sugerida

```plaintext
shared/
├── utils/
│   ├── date.util.ts          # formateo de fechas
│   └── crypto.util.ts        # funciones hash, comparaciones
├── exceptions/
│   ├── http.exception.ts     # clase HttpException
│   └── domain.exception.ts   # errores específicos del dominio
├── types/
│   └── global.types.ts       # tipos genéricos reutilizables
├── constants/
│   └── roles.ts              # roles como 'admin', 'user'
│   └── errorCodes.ts
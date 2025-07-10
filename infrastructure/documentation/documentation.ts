import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from '&/types/express';
import { configDocumentation } from '&/config/index';
import paths from './routes';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservicio de autenticación.',
      version: '1.0.0',
      description: 'Microservicio encargado de la creación y autenticación de usuarios.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    paths: { ...paths },
  },
  apis: ['../../interfaces/routes/index.ts', '../../interfaces/routes/index.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

const implementDocumentation = (app: Application, port: number) => {
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  console.log(`Ver documentación en: ${configDocumentation.URL_BASE}${port}/documentation`);
};

export default implementDocumentation;

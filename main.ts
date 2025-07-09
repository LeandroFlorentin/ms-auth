import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './interfaces/routes/';
import { errorMiddleware } from './interfaces/middlewares/error.middleware';
import { mainConfig } from './config';
import { createUser } from './infrastructure/cache/helpers/createUser';
import implementDocumentation from './infrastructure/documentation/documentation';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);
app.use(errorMiddleware);

async function connectServer() {
  const { PORT } = mainConfig;
  app.listen(PORT, () => {
    createUser();
    implementDocumentation(app, PORT);
    console.log(`Servidor escuchando en puerto: ${PORT}`);
  });
}

connectServer();

export default app;

import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './interfaces/routes/';
import { errorMiddleware } from './interfaces/middlewares/error.middleware';
import { mainConfig } from './config';
import implementSwagger from './infrastructure/swagger/swagger';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);
app.use(errorMiddleware);

async function connectServer() {
  const { PORT } = mainConfig;
  app.listen(PORT, () => {
    implementSwagger(app, PORT);
    console.log(`Servidor escuchando en puerto: ${PORT}`);
  });
}

connectServer();

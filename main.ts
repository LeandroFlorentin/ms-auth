import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './interfaces/routes/';
import { sequelize } from './infrastructure/database';
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
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      implementSwagger(app, PORT);
      console.log(`Servidor escuchando en puerto: ${PORT}`);
    });
  } catch (error) {
    sequelize.close();
    console.error('Error al intentar iniciar la app:', error);
    process.exit(1);
  }
}

connectServer();

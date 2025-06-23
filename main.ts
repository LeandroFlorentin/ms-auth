import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './interfaces/routes/';
import { sequelize } from './infrastructure/database';
import { errorMiddleware } from './interfaces/middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);
app.use(errorMiddleware);

async function connectServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    sequelize.close();
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

connectServer();

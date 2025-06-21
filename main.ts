import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './interfaces/routes/users.routes';
import { sequelize } from './infrastructure/database';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/users', userRoutes);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

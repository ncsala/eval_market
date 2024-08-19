import express from 'express';
import cors from 'cors';
import { sequelize, createDatabaseIfNotExists } from './infrastructure/config/database';
import authRoutes from './infrastructure/adapters/http/routes/authRoutes';
import productRoutes from './infrastructure/adapters/http/routes/productRoutes';
import { errorMiddleware, notFoundMiddleware } from './infrastructure/adapters/http/middlewares/errorMiddleware';
import './infrastructure/models';

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(express.json());

apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);

app.use('/api/v1', apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

async function initializeDatabase() {
  try {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initializeDatabase();

export default app;
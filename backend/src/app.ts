import express from 'express';
import cors from 'cors';
import { sequelize, createDatabaseIfNotExists } from './infrastructure/config/database';
import authRoutes from './infrastructure/adapters/http/routes/authRoutes';
import productRoutes from './infrastructure/adapters/http/routes/productRoutes';
import { errorMiddleware, notFoundMiddleware } from './infrastructure/adapters/http/middlewares/errorMiddleware';

const app = express();
const apiRouter = express.Router(); // Creas un router con prefijo

app.use(cors());
app.use(express.json());

apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);

// Registras el router principal en la aplicación
app.use('/api/v1', apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Definir la función initializeDatabase
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

if (process.env.NODE_ENV !== 'test') {
  initializeDatabase();
}

export default app;

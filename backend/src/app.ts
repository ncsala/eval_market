import express from 'express';
import cors from 'cors';
import { sequelize, createDatabaseIfNotExists } from './infrastructure/config/database';
import authRoutes from './infrastructure/adapters/http/routes/authRoutes';
import { errorMiddleware, notFoundMiddleware } from './infrastructure/adapters/http/middlewares/errorMiddleware';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);

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
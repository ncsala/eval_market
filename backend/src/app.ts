import express from 'express';
import { sequelize, createDatabaseIfNotExists } from './infrastructure/config/database';
import authRoutes from './infrastructure/adapters/http/routes/authRoutes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

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
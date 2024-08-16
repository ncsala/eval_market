import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

console.log('Database connection config:', {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '[HIDDEN]' : 'not set',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

async function createDatabaseIfNotExists() {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5435'),
    database: 'postgres',
  });

  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${process.env.DB_NAME}'`
    );

    if (result.rows.length === 0) {
      console.log(`Database ${process.env.DB_NAME} does not exist. Creating it now...`);
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created successfully.`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists.`);
    }
  } catch (err) {
    console.error('An error occurred while creating the database:', err);
    throw err;
  } finally {
    await client.end();
  }
}

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5435'),
  dialect: 'postgres',
  logging: console.log,
  dialectOptions: {
    connectTimeout: 20000
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export { sequelize, createDatabaseIfNotExists };
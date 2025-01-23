import { Sequelize } from 'sequelize';
import mysql from 'mysql2';
import dotenv from 'dotenv';

// get environment variables from .env
dotenv.config();

const db = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.authenticate()
    .then(() => {
        console.log('DB connection has been established successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

/* db.connect((err) => {
    if (err) {
        console.error('Error connecting to Database:', err.stack);
        return;
    }
    console.log('Connected to Database successfully');
}); */

export default db;
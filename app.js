import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import corsMiddleware from './middleware/cors.js';

const app = express();


dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(corsMiddleware);


// routes


// this route will be reached ONLY if previous routes
// weren't able to handle the request
app.use((req, res, next) => {
    const error = new Error('Not foud any correct route');
    error.status = 404;
    next(error);
});

// handle any error thrown by the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
});

export default app;
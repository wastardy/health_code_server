import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsMiddleware from './middleware/cors.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import commentRoutes from './routes/comments.js'
import shareRoutes from './routes/shares.js';
import challengeRoutes from './routes/challenges.js'
import relationshipRoutes from './routes/relationships.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(cors({
    // origin: 'http://localhost:5173', // allow requests from frontend side
    // credentials: true,
}));
app.use(cookieParser());


// routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);
app.use('/shares', shareRoutes);
app.use('/challenges', challengeRoutes);
app.use('/relationships', relationshipRoutes);


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
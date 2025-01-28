import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsMiddleware from './middleware/cors.js';

import testRoutes from './routes/test.js'
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import commentRoutes from './routes/comments.js';
import shareRoutes from './routes/shares.js';
import challengeRoutes from './routes/challenges.js';
import relationshipRoutes from './routes/relationships.js';
import dietRoutes from './routes/diets.js';
import workoutCategories from './routes/workoutCategories.js';
import workoutRoutes from './routes/workouts.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

//#region includes
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(cors({
    // origin: 'http://localhost:5173', // allow requests from frontend side
    // credentials: true,
}));
app.use(cookieParser());
//#endregion

//#region routes
// test route
app.use('/api/test', testRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/shares', shareRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/relationships', relationshipRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/workout_categories', workoutCategories);
app.use('/api/workouts', workoutRoutes);
//#endregion

//#region error_handlers
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
//#endregion

export default app;
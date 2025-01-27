import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import {
    getWorkouts, 
    addWorkout, 
    deleteWorkout
} from '../controllers/workout.js';

const router = express.Router();

router.get('/', verifyToken, getWorkouts);
router.post('/', verifyToken, addWorkout);
router.delete('/:id', verifyToken, deleteWorkout);

export default router;
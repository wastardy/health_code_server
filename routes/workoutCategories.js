import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import {
    getWorkoutCategories, 
    addWorkoutCategory,
    deleteWorkoutCategory
} from '../controllers/workoutCategory.js'

const router = express.Router();

router.get('/', verifyToken, getWorkoutCategories);
router.post('/', verifyToken, addWorkoutCategory);
router.delete('/:id', verifyToken, deleteWorkoutCategory);

export default router;
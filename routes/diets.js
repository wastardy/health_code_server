import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import {
    getDiets, 
    addDiet, 
    deleteDiet
} from '../controllers/diet.js';

const router = express.Router();

router.get('/', verifyToken, getDiets);
router.post('/', verifyToken, addDiet);
router.delete('/:id', verifyToken, deleteDiet);

export default router;
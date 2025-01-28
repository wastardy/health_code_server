import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import { 
    getUser, 
    updateUser 
} from '../controllers/user.js';

const router = express.Router();

router.get('/:user_id', verifyToken, getUser);

router.put('/:user_id', verifyToken, updateUser);

export default router;
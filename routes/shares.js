import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import { 
    getShares, 
    addShare
} from '../controllers/share.js';

const router = express.Router();

router.get('/', verifyToken, getShares);
router.post('/', verifyToken, addShare);

export default router;
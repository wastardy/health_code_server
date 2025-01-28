import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import { 
    getLikes, 
    addLike, 
    deleteLike
} from '../controllers/like.js';

const router = express.Router();

router.get('/', verifyToken, getLikes);
router.post('/', verifyToken, addLike);
router.delete('/:post_id', verifyToken, deleteLike);

export default router;
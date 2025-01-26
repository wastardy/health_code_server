import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import { 
    getComments, 
    addComment, 
    deleteComment
} from '../controllers/comment.js';

const router = express.Router();

router.get('/', verifyToken, getComments);
router.post('/', verifyToken, addComment);
router.delete('/:comment_id', verifyToken, deleteComment);

export default router;
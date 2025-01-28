import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import { 
    getPosts, 
    addPost, 
    deletePost 
} from '../controllers/post.js';

const router = express.Router();

router.get('/', verifyToken, getPosts);
router.post('/', verifyToken, addPost);
router.delete('/:post_id', verifyToken, deletePost);

export default router;
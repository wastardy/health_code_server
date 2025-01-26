import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import { 
    getChallenges, 
    addChallenge, 
    deleteChallenge
} from '../controllers/challenge.js';

const router = express.Router();

router.get('/', verifyToken, getChallenges);
router.post('/', verifyToken, addChallenge);
router.delete('/:challenge_id', verifyToken, deleteChallenge);

export default router;
import express from 'express';
import { 
    getChallenges, 
    addChallenge, 
    deleteChallenge
} from '../controllers/challenge.js';

const router = express.Router();

router.get('/', getChallenges);
router.post('/', addChallenge);
router.delete('/:challenge_id', deleteChallenge);

export default router;
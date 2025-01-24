import express from 'express';
import { 
    getShares, 
    addShare
} from '../controllers/share.js';

const router = express.Router();

router.get('/', getShares);
router.post('/', addShare);

export default router;
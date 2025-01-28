import express from 'express';
import verifyToken from '../middleware/checkAuth.js';
import {
    getRelationships, 
    addRelationship, 
    deleteRelationship
} from '../controllers/relationship.js';

const router = express.Router();

router.get('/', verifyToken, getRelationships);
router.post('/', verifyToken, addRelationship);
router.delete('/', verifyToken, deleteRelationship);

export default router;
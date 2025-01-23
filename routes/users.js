import express from 'express';
import { getUser, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/:user_id', (req, res, next) => {
    console.log(`Received GET request for user_id: ${req.params.user_id}`);
    next();
}, getUser);

router.put('/:user_id', (req, res, next) => {
    console.log(`Received PUT request for user_id: ${req.params.user_id}`);
    next();
}, updateUser);

export default router;
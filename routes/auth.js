import express from 'express';
import { 
    login, 
    devLogin, 
    register, 
    logout 
} from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/dev_login', devLogin);
router.post('/register', register);
router.post('/logout', logout);

export default router;
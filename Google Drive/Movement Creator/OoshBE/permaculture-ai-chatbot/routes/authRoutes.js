import express from 'express';
import { signup, login, getUser } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authenticateUser, getUser);

export default router;

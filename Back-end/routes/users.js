import express from 'express';
import {registerUser, loginUser, getAllUsers, resetUsers} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all', getAllUsers);
router.get('/resetUsers', resetUsers);

export default router;

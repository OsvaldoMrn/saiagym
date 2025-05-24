import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.loginUser);
router.get('/check-email', userController.checkEmail);

export default router;
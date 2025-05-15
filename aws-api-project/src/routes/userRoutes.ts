import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;
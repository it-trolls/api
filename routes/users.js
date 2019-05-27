import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../verifyToken';

const router = express.Router();

// GET request for one user.
router.get('/:id', verifyToken, userController.userDetail);

// POST request create user
router.post('/create', verifyToken, userController.userCreate);

// POST request to delete user.
router.post('/:id/delete', verifyToken, userController.userDelete);

// PUT request to update user.
router.put('/:id/update', verifyToken, userController.userUpdate);

// GET request for all users.
router.get('/', verifyToken, verifyToken, userController.userList);

module.exports = router;
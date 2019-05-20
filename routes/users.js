import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// GET request for one user.
router.get('/:id', userController.userDetail);

// POST request create user
router.post('/create', userController.userCreate); //controller.method
// router.post('/create', (req, res) => res.json({ msg: "user create works" }));

// POST request to delete user.
router.post('/:id/delete', userController.userDelete);

// PUT request to update user.
router.put('/:id/update', userController.userUpdate);

// GET request for all users.
router.get('/', userController.userList);

module.exports = router;
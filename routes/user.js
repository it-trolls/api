import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// GET request for one user.
router.get('/:id', userController.user_detail);

// POST request create user
router.post('/create', userController.user_create_post); //controller.method
// router.post('/create', (req, res) => res.json({ msg: "user create works" }));

// POST request to delete user.
router.post('/delete/:id', userController.user_delete_post);

// POST request to update user.
router.post('/update/:id', userController.user_update_post);

module.exports = router;
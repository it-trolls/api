import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// GET request for all users.
router.get('/', userController.user_list);

module.exports = router;
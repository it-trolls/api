import express from 'express';
import userController from '../controllers/userController';
// import verifyToken from '../validations';

// import config from '../config';
// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res) => {
//   const token = req.headers['x-access-token'];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
//   try {
//     jwt.verify(token, config.secret);
//   } catch (error) {
//     return res.status(400).send('Invalid Token');
//   }
// }

const router = express.Router();

// GET request for one user.
router.get('/:id', userController.userDetail);

// POST request create user
router.post('/create', userController.userCreate); //controller.method

// POST request to delete user.
router.post('/:id/delete', userController.userDelete);

// PUT request to update user.
router.put('/:id/update', userController.userUpdate);

// GET request for all users.
router.get('/', userController.userList);

module.exports = router;
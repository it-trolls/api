import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../verifyToken';
import userModel from '../models/User';

//probando dummy
// import dummy from 'mongoose-dummy';
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', '__v', 'created_at', 'updated_at', 'delete_at'];

const router = express.Router();

// GET example user object.
router.get('/example', (req, res) => {
  let randomUser = dummy(userModel, {
    ignore: ignoredFields,
    returnDate: true
  })
  res.status(200).json(randomUser);
});

// GET request for one user.
router.get('/:id', verifyToken, userController.userDetail);

// GET request for all users.
router.get('/', verifyToken, userController.userList);

// POST request create user
router.post('/create', verifyToken, userController.userCreate);

// POST request to delete user.
router.post('/:id/delete', verifyToken, userController.userDelete);

// PUT request to update user.
router.put('/:id/update', verifyToken, userController.userUpdate);

module.exports = router;
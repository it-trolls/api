import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../verifyToken';
import userModel from '../models/User';
import {check} from 'express-validator';

//probando dummy
// import dummy from 'mongoose-dummy';
const dummy = require('mongoose-dummy');
const ignoredFields = ['__v', 'created_at', 'updated_at', 'delete_at'];

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

// validations
const validationCreateUser = [
  check('email','the email must be a valid email address').isEmail(),
  check('email','the email field is required').isLength({min:1}),
  check('password','your password have a minimum of 6 characters').isLength({min:6}),
  check('email').custom(value => {
    return userModel.findOne({email: value}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
]

router.post('/',validationCreateUser, verifyToken, userController.userCreate);


// POST request to delete user.
router.delete('/:id', verifyToken, userController.userDelete);

// PUT request to update user.
router.put('/:id', verifyToken, userController.userUpdate);

module.exports = router;
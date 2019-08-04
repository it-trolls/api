import express from 'express';
import propertyController from '../controllers/propertyController';
import verifyToken from '../verifyToken';
import propertyModel from '../models/Property';

//probando dummy
import dummy from 'mongoose-dummy';
// const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', '__v', 'created_at', 'updated_at', 'delete_at'];

const router = express.Router();

// GET example property object.
router.get('/example', (req, res) => {
  let randomProperty = dummy(propertyModel, {
    ignore: ignoredFields,
    returnDate: true
  })
  res.status(200).json(randomProperty);
});

// GET request for one property.
router.get('/:id', verifyToken, propertyController.propertyDetail);

// GET request for all propertys.
router.get('/', verifyToken, propertyController.propertyList);

// POST request create property
router.post('/create', verifyToken, propertyController.propertyCreate); 

// POST request to delete property.
router.post('/:id/delete', verifyToken, propertyController.propertyDelete);

// PUT request to update property.
router.put('/:id/update', verifyToken, propertyController.propertyUpdate);

module.exports = router;
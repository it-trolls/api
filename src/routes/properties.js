import express from 'express';
import propertyController from '../controllers/propertiesController';
import verifyToken from '../verifyToken';
import propertyModel from '../models/Properties';
import {check} from 'express-validator';


//probando dummy
import dummy from 'mongoose-dummy';
// const dummy = require('mongoose-dummy');
const ignoredFields = ['__v', 'created_at', 'updated_at', 'delete_at'];

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

const validationCreateProperty = [
  check('address')
    .isLength({min:1}).withMessage('the address field is required')
    .isLength({max:250}).withMessage('address is too long'),
  check('location')
    .isLength({min:1}).withMessage('the location field is required')
    .isLength({max:250}).withMessage('location is too long'),
    check('realState')
    .isLength({min:1}).withMessage('realState ID field is required'),
  check('antiquity')
    .optional().isInt().withMessage('aniquity value must be a number'),
  check('description')
    .isLength({max:650}).optional().withMessage('description is too long'),
  check('price')
    .optional()
    .isInt().withMessage('price value must be a number')
    .isLength({max:16}).withMessage('price value is too long'),
  check('coveredArea')
    .optional()
    .isInt().withMessage('coveredArea value must be a number')
    .isLength({max:16}).withMessage('coveredArea is too long'),
  check('neighborhood')
    .optional()
    .isLength({max:250}).withMessage('neighborhood is too long'),
  check('bathrooms')
    .optional()
    .isInt().withMessage('bathrooms value must be a number')
    .isLength({max:8}).withMessage('bathrooms is too long'),
  check('bedrooms')
    .optional()
    .isInt().withMessage('bathrooms value must be a number')
    .isLength({max:8}).withMessage('bathrooms is too long'),
  check('state')
    .optional()
    .isIn(['sold','rented','available','paused']).withMessage('state not in value list'),
    check('garden')
    .optional()
    .isBoolean().withMessage('Garden must be boolean value'),
  check('type')
    .optional()
    .isIn(['house','department']).withMessage('type not in value list'),
  
]

router.post('/', validationCreateProperty, verifyToken, propertyController.propertyCreate); 

// POST request to delete property.
router.delete('/:id', verifyToken, propertyController.propertyDelete);

// PUT request to update property.
router.put('/:id', verifyToken, propertyController.propertyUpdate);

module.exports = router;
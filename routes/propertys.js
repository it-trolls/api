import express from 'express';
import propertyController from '../controllers/propertyController';
import verifyToken from '../verifyToken';
import propertyModel from '../models/Property';
import {check} from 'express-validator';
import realStateModel from '../models/RealState';



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
  check('address','the address field is required').isLength({min:1}),
  check('address','your is too long').isLength({max:250}),
  check('location','the location field is required').isLength({min:1}),
  check('location','your is too long').isLength({max:250}),
  check('realState','realState ID field is required').isLength({min:1}),
  check('antiquity','aniquity value must be a number').isInt(),

  //trying to check if realstate does exist
  // check('realState').custom(value => {
  //   console.log('valerus',value );
  //   let flag = false;
  //   realStateModel.findOne({ _id: value}).then(realstate => {
  //     // inprove logic, idk if its okay
  //     // if (realstate) {
  //     //   return Promise.reject('Realstate doesnt exist');
  //     // }
  //   }).catch(
      
  //     flag = true;
      
  //     );
      
  //     return Promise.reject('Realstate doesnt exist');
  // //   // const realState = await realStateModel.findOne({ _id: req.body.realState });
  // }),
]

router.post('/', validationCreateProperty, verifyToken, propertyController.propertyCreate); 

// POST request to delete property.
router.delete('/:id', verifyToken, propertyController.propertyDelete);

// PUT request to update property.
router.put('/:id', verifyToken, propertyController.propertyUpdate);

module.exports = router;
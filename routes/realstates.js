import express from 'express';
import realStateController from '../controllers/realStateController';
import verifyToken from '../verifyToken';
import realStateModel from '../models/RealState';

//probando dummy
import dummy from 'mongoose-dummy';
// const dummy = require('mongoose-dummy');
const ignoredFields = ['__v', 'created_at', 'updated_at', 'delete_at'];

const router = express.Router();

// GET example property object.
router.get('/example', (req, res) => {
  let randomRealState = dummy(realStateModel, {
    ignore: ignoredFields,
    returnDate: true
  })
  res.status(200).json(randomRealState);
});

// GET request for one realState.
router.get('/:id', verifyToken, realStateController.realStateDetail);

// GET request for all realStates.
router.get('/', verifyToken, realStateController.realStateList);

// GET request for all propertys of a realState.
router.get('/:id/propertys', verifyToken, realStateController.realStatePropertysList);

// POST request create realState
router.post('/', verifyToken, realStateController.realStateCreate);

// POST request to delete realState.
router.delete('/:id', verifyToken, realStateController.realStateDelete);

// PUT request to update realState.
router.put('/:id', verifyToken, realStateController.realStateUpdate);

module.exports = router;
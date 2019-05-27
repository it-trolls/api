import express from 'express';
import propertyController from '../controllers/propertyController';
import verifyToken from '../verifyToken';

const router = express.Router();

// GET request for one property.
router.get('/:id', verifyToken, propertyController.propertyDetail);

// POST request create property
router.post('/create', verifyToken, propertyController.propertyCreate); 

// POST request to delete property.
router.post('/:id/delete', verifyToken, propertyController.propertyDelete);

// PUT request to update property.
router.put('/:id/update', verifyToken, propertyController.propertyUpdate);

// GET request for all propertys.
router.get('/', verifyToken, propertyController.propertyList);

module.exports = router;
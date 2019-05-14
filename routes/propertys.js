import express from 'express';
import propertyController from '../controllers/propertyController';

const router = express.Router();

// GET request for one property.
router.get('/:id', propertyController.propertyDetail);

// POST request create property
router.post('/create', propertyController.propertyCreate); //controlller.method
// router.post('/create', (req, res) => res.json({ msg: "property create works" }));

// POST request to delete property.
router.post('/delete/:id', propertyController.propertyDelete);

// PUT request to update property.
router.put('/update/:id', propertyController.propertyUpdate);

// GET request for all propertys.
router.get('/', propertyController.propertyList);

module.exports = router;
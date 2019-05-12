import express from 'express';
import propertyController from '../controllers/propertyController';

const router = express.Router();

// GET property home page.
router.get('/', propertyController.index);

// GET request for one property.
router.get('/:id', propertyController.property_detail);

// GET request for all propertys.
router.get('/all', propertyController.property_list);

// POST request create property
router.post('/create', propertyController.property_create_post); //controlller.method
// router.post('/create', (req, res) => res.json({ msg: "property create works" }));

// POST request to delete property.
router.post('/delete/:id', propertyController.property_delete_post);

// POST request to update property.
router.get('/update/:id', propertyController.property_delete_post);


module.exports = router;
import express from 'express';
import propertyController from '../controllers/propertyController';

const router = express.Router();

// GET request for all propertys.
router.get('/', propertyController.property_list);

module.exports = router;
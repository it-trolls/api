import express from 'express';
import messagesController from '../controllers/messagesController';
import verifyToken from '../verifyToken';
// import messageModel from '../models/Messages';
import {check} from 'express-validator';




const router = express.Router();


// GET request for one message.
router.get('/:id', verifyToken, messagesController.messageDetail);

// GET request for all messages.
router.get('/', verifyToken,  messagesController.messageList);

// POST request create message

const validationCreatemessage = [
  check('body')
    .isLength({min:1}).withMessage('the body field is required')
]


// router.post('/', validationCreateProperty, verifyToken, propertyController.propertyCreate); 
router.post('/', validationCreatemessage, verifyToken, messagesController.messageCreate); 

// POST request to delete message.
router.delete('/:id', verifyToken, messagesController.messageDelete);

// PUT request to update message.
router.put('/:id', verifyToken, messagesController.messageUpdate);



module.exports = router;
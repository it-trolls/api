import messageModel from '../models/Messages';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';




// GET request for one message
exports.messageDetail = async (req, res) => {
  try {
    //recupero el id pasado por param
    const idMessage = req.params.id;

    const messages = await messageModel.findById(idMessage);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).send({ 
      success: false, 
      error: error 
    });
  }
}

// GET request for all message.
exports.messageList = async (req, res) => {

  try {
    const messages = await messageModel.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).send({ 
      success: false,
      error: error
    });
  }
}


// POST request create message
exports.messageCreate = async (req, res) => { 


  //validacion
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors : errors.array()});
  }try {
    
    req.body.updated_at = Date.now();
    req.body.created_at = Date.now();

    const Message = new messageModel(req.body);
    const message = await Message.save();

    res.status(200).send({message})
    
  } catch (error) {
    res.status(400).send({ 
      create: false, 
      error: error 
    });
  }

}

// DELETE request to delete message
exports.messageDelete = async (req, res) => { 
  try {
    //recupero el id pasado por param
    const idMessage = req.params.id;

    const message = await messageModel.findOneAndRemove({ _id: idMessage });

    if (message == null) 
      return res.status(200).send({
        delete: false,
        error: 'this message does not exist.'
      });


    let response = {
      delete:true,
      message : 'This message has been successfully deleted',
      value : {id : idMessage, sender : `${message.sender}` , receiver : `${message.receiver}` }
    }
    return res.status(200).json(response);

  } catch (error) {
    res.status(400).send({ 
      delete: false, 
      error: error 
    });
  }
}

// PUT request to update message
exports.messageUpdate = async (req, res) => {

  try {
    const message = await messageModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: Object.assign(req.body) },
      { new: true },
    )
    res.status(200).json(message);
  }
  catch (error) {
    res.status(400).send({
      update: false,
      error: error
    });
  }
}
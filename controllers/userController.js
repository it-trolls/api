import userModel from '../models/User';
import {check,validationResult} from 'express-validator';

//info de todos los usuarios
exports.userList = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      value: users
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error
    });
  }
}

//info de un usuario especifico
exports.userDetail = async (req, res) => {
  //recupero el id pasado por param
  const idUser = req.params.id;

  try {
    const user = await userModel.findById(idUser);
    res.status(200).send({
      success: true,
      value: user
    });
  } catch(error) {
    res.status(400).send({
      success: false,
      error: error
    });
  }
}

//crear un usuario
exports.userCreate = async (req, res) => {
  try {

    // console.log('llega',req)

    const errors = validationResult(req);

    if(!errors.isEmpty()){

      return res.status(422).json({errors : errors.array()});
    }

    console.clear();
    console.log('req body', req.body);

    const User = new userModel({
      email: req.body.email,
      password: req.body.password,
    });
      
    const user = await User.save();
    
    res.status(200).send({
      success: true,
      value: user
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error
    });
  }
}

//borrar un usuario
exports.userDelete = async (req, res) =>{

  console.log('userdelete bp');
  try {
    //recupero el id pasado por param
    const idUser = req.params.id;

    const user = await userModel.findOneAndRemove({ _id: idUser });
    res.status(200).send({
      success: true,
      value: user
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error
    });

    console.log(`/controllers/userControllers.js Error: ${error}`);
  }
}

//actualizar un usuario
exports.userUpdate = async (req, res) => {

  console.clear();
  console.log('req',req.params); 
  console.log('req body',req.body); 
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: Object.assign(req.body) },
      { new: true },
    )
    res.status(200).send({
      success: true,
      value: user
    });
  }
  catch(error) {
    res.status(400).send({
      success: false,
      error: error
    });
  }
  
}

import userModel from '../models/User';
import config from '../config';
import jwt from 'jsonwebtoken';

//info de todos los usuarios
exports.userList = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send({ message: 'error', error });
  }
}

//info de un usuario especifico
exports.userDetail = async (req, res) => {
  //recupero el id pasado por param
  const idUser = req.params.id;

  try {
    const user = await userModel.findById(idUser);
    res.status(200).json(user);
  } catch(error) {
    res.status(400).send({ message: 'error', error });
  }
}

//crear un usuario
exports.userCreate = async (req, res) => {
  try {
    console.clear();
    console.log('req body', req.body);
    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const User = new userModel({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // password: hashedPassword
    });
      
    const user = await User.save();

    // create a token
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    res.status(400).send({ message: 'error', error });
    res.status(400).send({ message: 'error al registrar usuario', error });
  }
}

//borrar un usuario
exports.userDelete = async (req, res) =>{
  try {
    //recupero el id pasado por param
    const idUser = req.params.id;

    const user = await userModel.findOneAndRemove({ _id: idUser });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ message: 'error', error });
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
    res.status(200).json(user);
  }
  catch(error) {
    res.status(400).send({ message: 'error', error });
  }
  
}

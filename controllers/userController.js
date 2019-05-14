import userModel from '../models/User';

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
    const User = new userModel(
      {
        username: 'testUser',
        password: 'regnum',
        name: 'gaston',
        mail: 'regnum@gmail.com.ar',
        token: 'String'
      }
    );
    const user = await User.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ message: 'error', error });
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

  let userUpdated = 
    {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      mail: req.body.mail,
      token: req.body.token
    };

  console.clear();
  console.log('req',req.params); 
  console.log('req body',req.body); 
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: userUpdated },
      { new: true },
    )
    res.status(200).json(user);
  }
  catch(error) {
    res.status(400).send({ message: 'error', error });
  }
  
}

import userModel from '../models/User';

//info de todos los usuarios
exports.user_list = function (req, res) {
  try {
    userModel.find({}).then(eachOne => {
      res.json(eachOne);
    })
  } catch (error) {
    console.log(error);
  }
}

//info de un usuario especifico
exports.user_detail = async (req, res) => {
  //recupero el id pasado por param
  const idUser = req.params.id;

  try {
    const user = await userModel.findById(idUser);
    res.status(200).send({ data: user })
  } catch(error) {
    res.status(400).send({ message: 'error', error });
  }
}

//crear un usuario
exports.user_create_post = function (req, res) {
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
    User.save()
      .then((user) => console.log(user))
      .catch(error => console.log(error))

    res.json(User);

  } catch (error) {
    console.log(error);
  }
}

//borrar un usuario
exports.user_delete_post = function (req, res) {
  try {
    //recupero el id pasado por param
    const idUser = req.params.id;

    userModel.findOneAndRemove({ _id: idUser }, function (err) {
      res.json('ok');
    });

  } catch (error) {
    console.log(error);
  }
}

//actualizar un usuario
exports.user_update_post = function (req, res) {

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
    userModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: userUpdated },
      { new: true },

      (err, user) => {
        if (err) return res.status(500).send(err);
        return res.json(user);
      }
    )
  }
  catch(error) {
    console.log(error);
  }
  
}

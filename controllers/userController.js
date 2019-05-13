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
exports.user_detail = function (req, res) {
  try {
    //recupero el id pasado por param
    const idUser = req.params.id;

    userModel.findById(idUser, function (err, item) {
      res.status(200).send({ data: item })
      res.status(400).send({ message: 'error' });
    });
  } catch (error) {
    console.log(error);
  }
}

//crear un usuario
exports.user_create_post = function (req, res) {
  try {
    const User = new userModel(
      {
        usuario: 'gaston',
        contraseña: '123456',
        created_at: 'string',
        updated_at: 'String',
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
  res.send('NOT IMPLEMENTED: user update POST');
}

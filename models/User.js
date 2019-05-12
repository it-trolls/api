import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
  usuario: String,
  contraseña: String,
  permiso: String,
  nombre: String,
  mail: String,
  dni: Number,
  tel: [
    { nro: String }
  ],
  created_at: String,
  updated_at: String,
  token: String,
})

const userModel = mongoose.model('User', user);

module.exports = userModel;
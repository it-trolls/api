import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
  username: {
    type: String,
    // required: true,
    // unique: true
  },
  password: { 
    type: String,
    required: true
  },
  permission: {
    type: String,
    required: false
  },
  name: { 
    type: String,
    required: false,
  },
  email: { 
    type: String,
    required: true,
    // unique: true //con esto salta: (node:15680) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  },
  dni: {
    type: String,
    required: false,
  },
  phone: [
    { 
      phoneNumber: {
        type: String,
        required: false,
      }
    }
  ],
  created_at: {
    type: Date,
    dafault: Date.now()
  },
  updated_at: {
    type: Date,
    dafault: Date.now()
  },
  delete_at: {
    type: Date
  },
})

//falta encriptar el password: md5, brcypt ?

const userModel = mongoose.model('User', user);

module.exports = userModel;
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import uniqueValidator from 'mongoose-unique-validator';
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    //required: true,
    //unique: true
  },
  password: { 
    type: String,
    required: true,
    select: false
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
    unique: true //con esto salta: (node:15680) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
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

userSchema.plugin(uniqueValidator);
 
//password hash process 

//funciona, pero es complicado de leer
// user.pre('save',function(next){
//   console.log("go");
//   bcrypt.genSalt(10).
//     then(salts=>{
//       bcrypt.hash(this.password,salts)
//         .then(hash =>{
//           this.password = hash;
//           next();
//     }).catch(error=>next(error));

//   }).catch(error => next(error));
// });

userSchema.pre('save', async function(next){
  try{
    //salt is random data that is used as an additional input that hash password
    let salt = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();

  }catch(error){
    next(error);
  }

});




const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
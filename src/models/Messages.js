import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({

  body:{
    type:String,
    default:''
  },

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
  sender: {
    type: String,
    default: ''
  },
  receiver: {
    type: String,
    default: ''
  },

});


const messageModel = mongoose.model('Messages', messageSchema);

module.exports = messageModel;
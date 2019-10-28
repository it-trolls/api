import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// una inmo puede tener varios usuarios y un usuario puede estar relacionado en varias inmobiliarias
// web, razon social, cuit, direccion
// coleccion "Contraro/Alquiler"
// ver .populate
// registrarse, inmo carga una propiedad, un usuario puede ver la propiedad.

var realStateSchema = new Schema({ //inmobiliaria
  users: [
    { type: Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ],
  propertys: [
    { type: Schema.Types.ObjectId, 
      ref: 'Property' 
    }
  ],
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  website: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false //testeando
  },
  businessName: { //razon social
    type: String,
    required: false //testeando
  },
  cuit: {
    type: String,
    required: false, //testeando
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
});

const realStateModel = mongoose.model('RealState', realStateSchema);

module.exports = realStateModel;
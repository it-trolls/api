import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// una inmo puede tener varios usuarios y un usuario puede estar relacionado en varias inmobiliarias
// web, razon social, cuit, direccion

// coleccion "Contraro/Alquiler"

// ver .populate


// registrarse, inmo carga una propiedad, un usuario puede ver la propiedad.


var property = new Schema({
  antiquity: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  provision: { //disposicion: frente, pasillo
    type: String,
    required: false
  }, 
  garage: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  coveredArea: { //superficie cubierta
    type: Number,
    required: false
  },
  neighborhood: { //barrio
    type: String,
    required: false
  },
  bathrooms: {
    type: Number,
    required: true,
    default:0
  },
  bedrooms: {
    type: Number,
    required: true,
    default:0,
  },
  state: { //vendido, alquilado
    type: String,
    enum: ['vendido','alquilado'],
    required: false
  }, 
  garden: {
    type: Boolean,
    required: false
  },
  operation: [
    {
      rental: { //alquiler
        type: Boolean,
        required: false
      },
      purchase: {
        type: Boolean,
        required: false
      },
      sale: {
        type: Boolean,
        required: false
      },
    }
  ],
  type: {
    type: String,
    enum: ['house', 'department'],
  },
  services: [
    {
      water: {
        type: Boolean,
        required: false
      },
      heating: { //calefacción
        type: Boolean,
        required: false
      },
      sewer: { //cloacas
        type: Boolean,
        required: false
      },
      electricity: {
        type: Boolean,
        required: false
      },
      gas: {
        type: Boolean,
        required: false
      },
    }
  ],
  pictures: [
    { url: {
        type: String,
        required: false
      } 
    }
  ]
});




const propertyModel = mongoose.model('property', property);

module.exports = propertyModel;
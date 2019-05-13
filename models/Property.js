import mongoose from 'mongoose';
var Schema = mongoose.Schema;

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
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  state: { //vendido, alquilado
    type: String,
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
  type: [
    {
      house: {
        type: Boolean,
        required: false
      },
      department: {
        type: Boolean,
        required: false
      },
    }
  ],
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
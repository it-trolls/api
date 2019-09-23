import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var propertySchema = new Schema({
  realState: { 
    type: Schema.Types.ObjectId, 
    ref: 'RealState', 
    required: true 
  },
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
});

const propertyModel = mongoose.model('Property', propertySchema);

module.exports = propertyModel;
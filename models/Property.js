import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var propertySchema = new Schema({
  realState: { 
    type: Schema.Types.ObjectId, 
    ref: 'RealState',
  },
  antiquity: {
    type: Number,
  },
  description: {
    type: String,
  },
  provision: { //disposicion: frente, pasillo
    type: String,
  }, 
  garage: {
    type: String,
  },
  location: {
    type: String,
  },
  address: {
    type: String,
  },
  price: {
    type: Number,
  },
  coveredArea: { //superficie cubierta
    type: Number,
  },
  neighborhood: { //barrio
    type: String,
  },
  bathrooms: {
    type: Number,
    default:0
  },
  bedrooms: {
    type: Number,
    default:0,
  },
  state: { //vendido, alquilado
    type: String,
    enum: ['vendido','alquilado'],
  }, 
  garden: {
    type: Boolean,
  },
  operation: [
    {
      rental: { //alquiler
        type: Boolean,
      },
      purchase: {
        type: Boolean,
      },
      sale: {
        type: Boolean,
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
      },
      heating: { //calefacción
        type: Boolean,
      },
      sewer: { //cloacas
        type: Boolean,
      },
      electricity: {
        type: Boolean,
      },
      gas: {
        type: Boolean,
      },
    }
  ],
  pictures: [
    { url: {
        type: String,
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
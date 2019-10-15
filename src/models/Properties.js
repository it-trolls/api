import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  // realState: { //este modelo no se usa mas por ahora
  //   type: Schema.Types.ObjectId, 
  //   ref: 'RealState', 
  //   required: true 
  // },
  antiquity: {
    type: Number,
    required: false,
    default: 0
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  provision: { //disposicion: frente, pasillo
    type: String,
    required: false,
    default: ''
  }, 
  garage: {
    type: String,
    required: false,
    default: ''
  },
  location: {
    type: String,
    required: true,
    default: ''
  },
  address: {
    type: String,
    required: true,
    default: ''
  },
  price: {
    type: Number,
    required: false,
    default: 0
  },
  coveredArea: { //superficie cubierta
    type: Number,
    required: false,
    default: 0
  },
  neighborhood: { //barrio
    type: String,
    required: false,
    default: ''
  },
  bathrooms: {
    type: Number,
    required: true,
    default: 0
  },
  bedrooms: {
    type: Number,
    required: true,
    default: 0,
  },
  state: { //vendido, alquilado
    type: String,
    enum: ['sold','rented'],
    required: false,
    default: ''
  }, 
  garden: {
    type: Boolean,
    required: false,
    default: false
  },  
  operation: 
  [
    {
      rental: { //alquiler, 
        type: Boolean,
        required: false,
        default: false
      },
      purchase: {
        type: Boolean,
        required: false,
        default: false
      },
      sale: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  ],
  type: {
    type: String,
    enum: ['house', 'department'],
    default: ''
  },
  services: [
    {
      water: {
        type: Boolean,
        required: false,
        default: false
      },
      heating: { //calefacción
        type: Boolean,
        required: false,
        default: false
      },
      sewer: { //cloacas
        type: Boolean,
        required: false,
        default: false
      },
      electricity: {
        type: Boolean,
        required: false,
        default: false
      },
      gas: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  ],
  pictures: [
    { url: {
        type: String,
        required: false,
        default: ''
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
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  // realState: { //este modelo no se usa mas por ahora
  //   type: Schema.Types.ObjectId, 
  //   ref: 'RealState', 
  //   required: true 
  // },
  title:{
    type:String,
    default:''
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  state: { //vendido, alquilado
    type: String,
    enum: ['rental','sale','sold','rented','available','paused'],
    required: false,
    // default: ''
  }, 
  contract: { //vendido, alquilado
    type: String,
    enum: ['rental', 'sale'],
    required: false,
    // default: ''
  }, 
 
  type: {
    type: String,
    enum: ['house', 'department', 'office'],
    default: ''
  },

  price: {
    type: Number,
    required: false,
    default: 0
  },
  address: {
    type: String,
    required: true,
    default: ''
  },
  neighborhood: { //barrio
    type: String,
    required: false,
    default: ''
  },
  floor: { 
    type: String,
    required: false,
    default: ''
  },
  coveredArea: { //superficie cubierta m^2
    type: Number,
    required: false,
    default: 0
  },
  antiquity: {
    type: Number,
    required: false,
    default: 0
  },
  bedrooms: {
    type: Number,
    required: false, 
    default: 0,
  },
  bathrooms: {
    type: Number,
    required: false, 
    default: 0
  },
  kitchens: {
    type: Number,
    required: false, 
    default: 0
  },
  courtyard: {
    type: Boolean,
    required: false, 
    default: 0
  },
  pictures: [],
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
  created_by: {
    type: String,
    default: ''
  },



  // extra not in form
  // city: { 
  //   type: String,
  //   required: false,
  //   default: ''
  // },

  // propertyImage:{
  //   type:String,
  //   default:''
  // },
  // provision: { //disposicion: frente, pasillo
  //   type: String,
  //   required: false,
  //   default: ''
  // }, 
  // garage: {
  //   type: String,
  //   required: false,
  //   default: ''
  // },
  // location: {
  //   type: String,
  //   required: false,
  //   default: ''
  // },

  // garden: {
  //   type: Boolean,
  //   required: false,
  //   default: false
  // },  
  // operation: 
  // [
  //   {
  //     rental: { //alquiler, 
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     },
  //     purchase: {
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     },
  //     sale: {
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     }
  //   }
  // ],

  // services: [
  //   {
  //     water: {
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     },
  //     heating: { //calefacción
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     },
  //     sewer: { //cloacas
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     },
  //     electricity: {
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     },
  //     gas: {
  //       type: Boolean,
  //       required: false,
  //       default: false
  //     }
  //   }
  // ],

});


// propertySchema.pre('save', async function(next){
//   try{
    
//     this.propertyImage = req.body.file.path

//   }catch(error){
//     next(error);
//   }

// });

const propertyModel = mongoose.model('Property', propertySchema);

module.exports = propertyModel;
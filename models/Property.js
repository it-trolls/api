import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var property = new Schema({
  antiguedad: Number,
  descripcion: String,
  disposicion: String,
  garage: String,
  localidad: String,
  direccion: String,
  precio: String,
  supCubierta: String,
  barrio: String,
  cantBanos: 0,
  cantHab: 0,
  estado: String,
  patio: Boolean,
  operacion: [
    {
      Alquiler: Boolean,
      Compra: Boolean,
      Venta: Boolean,
    }
  ],
  tipo: [
    {
      casa: Boolean,
      departamento: Boolean,
    }
  ],
  servicios: [
    {
      agua: Boolean,
      calefaccion: Boolean,
      cloacas: Boolean,
      eletricidad: Boolean,
      gas: Boolean
    }
  ],
  fotos: [
    { url: String }
  ]
});

const propertyModel = mongoose.model('property', property);

module.exports = propertyModel;
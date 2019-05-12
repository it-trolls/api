import propertyModel from '../models/Property';

exports.index = function (req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// GET request for one property
exports.property_detail = function (req, res) {
  try {
    //recupero el id pasado por param
    const idProperty = req.params.id;

    propertyModel.findById(idProperty, function (err, item) {
      res.status(200).send({ data: item })
      res.status(400).send({ message: 'error' });
    });

  } catch (error) {
    console.log(error);
  }
}

// GET request for all propertys.
exports.property_list = function (req, res) {
  try {
    propertyModel.find({}).then(eachOne => {
      res.json(eachOne);
    })

  } catch (error) {
    console.log(error);
  }
}

// POST request create property
exports.property_create_post = function (req, res) { 
  try {
    const Property = new propertyModel({
      antiguedad: '1',
      descripcion: 'nuevomodel',
      disposicion: 'test',
      estado: 'test',
      garage: 'test',
      localidad: 'test',
      direccion: 'test',
      patio: false,
      precio: 123,
      supCubierta: 'test',
      barrio: 'test',
      cantBanos: 1,
      cantHab: 1,
    })

    Property.save()
      .then((property) => console.log(property))
      .catch(error => console.log(error))

    res.json(Property);

  } catch (error) {
    console.log(error);
  }
}

// POST request to delete property
exports.property_delete_post = function (req, res) { 
  try {
    //recupero el id pasado por param
    const idProperty = req.params.id;

    propertyModel.findOneAndRemove({ _id: idProperty }, function (err) {
      res.json('ok');
    });

  } catch (error) {
    console.log(error);
  }
}

// POST request to update property
exports.property_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: property update POST');
}
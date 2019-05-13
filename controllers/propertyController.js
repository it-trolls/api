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
      antiquity: 1,
      description: 'nuevomodel',
      provision: 'frente',
      state: 'alquilado',
      garage: false,
      location: 'test',
      address: 'alfredo caseros 69',
      garden: false,
      price: 123,
      coveredArea: 1234,
      neighborhood: 'Brasca',
      bathrooms: 1,
      bedrooms: 1,
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
  let propertyUpdated =
  {
    antiquity: req.body.antiquity,
    description: req.body.description,
    provision: req.body.provision,
    state: req.body.state,
    garage: req.body.garage,
    location: req.body.location,
    address: req.body.address,
    garden: req.body.garden,
    price: req.body.price,
    coveredArea: req.body.coveredArea,
    neighborhood: req.body.neighborhood,
    bathrooms: req.body.bathrooms,
    bedrooms: req.body.bedrooms,
  };

  console.clear();
  console.log('req', req.params);
  console.log('req body', req.body);
  try {
    propertyModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: propertyUpdated },
      { new: false },

      (err, property) => {
        if (err) return res.status(500).send(err);
        return res.json(property); //retorna el viejo
      }
    )
  }
  catch (error) {
    console.log(error);
  }
}
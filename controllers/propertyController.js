import propertyModel from '../models/Property';

// GET request for one property
exports.propertyDetail = async (req, res) => {
  try {
    //recupero el id pasado por param
    const idProperty = req.params.id;

    const property = propertyModel.findById(idProperty);
    res.status(200).json(property);
  } catch (error) {
    res.status(400).send({ message: 'error', error });
  }
}

// GET request for all propertys.
exports.propertyList = async (req, res) => {
  try {
    const propertys = await propertyModel.find({});
    res.status(200).json(propertys);
  } catch (error) {
    res.status(400).send({ message: 'error', error });
  }
}

// POST request create property
exports.propertyCreate = async (req, res) => { 
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

    const property = await Property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(400).send({ message: 'error', error });
  }
}

// POST request to delete property
exports.propertyDelete = async (req, res) => { 
  try {
    //recupero el id pasado por param
    const idProperty = req.params.id;

    const property = await propertyModel.findOneAndRemove({ _id: idProperty });
    res.status(200).json(property);
  } catch (error) {
    res.status(400).send({ message: 'error', error });
  }
}

// POST request to update property
exports.propertyUpdate = async (req, res) => {
  // let propertyUpdated =
  // {
  //   antiquity: req.body.antiquity,
  //   description: req.body.description,
  //   provision: req.body.provision,
  //   state: req.body.state,
  //   garage: req.body.garage,
  //   location: req.body.location,
  //   address: req.body.address,
  //   garden: req.body.garden,
  //   price: req.body.price,
  //   coveredArea: req.body.coveredArea,
  //   neighborhood: req.body.neighborhood,
  //   bathrooms: req.body.bathrooms,
  //   bedrooms: req.body.bedrooms,
  // };

  console.clear();
  console.log('req', req.params);
  console.log('req body', req.body);
  try {
    const property = await propertyModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: Object.assign(req.body) },
      { new: false },
    )
    res.status(200).json(property);
  }
  catch (error) {
    res.status(400).send({ message: 'error', error });
  }
}
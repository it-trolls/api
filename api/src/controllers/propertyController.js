import propertyModel from '../models/Property';
import realStateModel from '../models/RealState';

// GET request for one property
exports.propertyDetail = async (req, res) => {
  try {
    //recupero el id pasado por param
    const idProperty = req.params.id;

    const property = await propertyModel.findById(idProperty);
    res.status(200).json(property);
  } catch (error) {
    res.status(400).send({ 
      success: false, 
      error: error 
    });
  }
}

// GET request for all propertys.
exports.propertyList = async (req, res) => {
  try {
    const propertys = await propertyModel.find({});
    res.status(200).json(propertys);
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error
    });
  }
}

// POST request create property
exports.propertyCreate = async (req, res) => { 
  try {
    const Property = new propertyModel(req.body);

    const property = await Property.save();

    const realState = await realStateModel.findOne({ _id: req.body.realState });

    realState.propertys.push(property._id);
    realState.save();

    // res.status(200).send({
    //   create: true,
    //   value: json(property)
    // });
    
    res.status(200).send({property})

  } catch (error) {
    res.status(400).send({ 
      create: false, 
      error: error 
    });
  }
}

// POST request to delete property
exports.propertyDelete = async (req, res) => { 
  try {
    //recupero el id pasado por param
    const idProperty = req.params.id;

    const property = await propertyModel.findOneAndRemove({ _id: idProperty });

    if (property == null) 
      return res.status(200).send({
        delete: false,
        error: 'this property does not exist.'
      });

    return res.status(200).json(property);

  } catch (error) {
    res.status(400).send({ 
      delete: false, 
      error: error 
    });
  }
}

// POST request to update property
exports.propertyUpdate = async (req, res) => {

  console.clear();
  console.log('req', req.params);
  console.log('req body', req.body);
  try {
    const property = await propertyModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: Object.assign(req.body) },
      { new: true },
    )
    res.status(200).json(property);
  }
  catch (error) {
    res.status(400).send({
      update: false,
      error: error
    });
  }
}
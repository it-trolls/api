import realStateModel from '../models/RealState';
import propertyModel from '../models/Property';
import {realStateValidation} from '../validation';

// GET request for one property
exports.realStateDetail = async (req, res) => {
  try {
    //recupero el id pasado por param
    const idrealState = req.params.id;

    const realState = await realStateModel.findById(idrealState);
    res.status(200).json(realState);

  } catch (error) {
    res.status(400).send({ 
      success: false, 
      error: error 
    });
  }
}

// GET request for all propertys.
exports.realStateList = async (req, res) => {
  try {
    const realStates = await realStateModel.find({});
    res.status(200).json(realStates);
  } catch (error) {
    res.status(400).send({ 
      success: false, 
      error: error 
    });
  }
}

// GET request for all propertys of a realState.
exports.realStatePropertysList = async (req, res) => {
  try {
    //recupero el id pasado por param
    const idrealState = req.params.id;

    const propertys = await realStateModel.find({ _id: idrealState }).populate('propertys');

    res.status(200).json(propertys);
  } catch (error) {
    res.status(400).send({ 
      success: false, 
      error: error 
    });
  }
}

// POST request create property
exports.realStateCreate = async (req, res) => { 

  // use joi to validate
  const {error} = realStateValidation(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const RealState = new realStateModel(req.body);

    // _id: new mongoose.Types.ObjectId(),

    const realState = await RealState.save();
    res.status(200).json(realState);
  } catch (error) {
    res.status(400).send({ 
      create: false, 
      error: error 
    });
  }
}

// POST request to delete property
exports.realStateDelete = async (req, res) => { 
  try {
    //recupero el id pasado por param
    const idrealState = req.params.id;

    const realState = await realStateModel.findOneAndRemove({ _id: idrealState });
    res.status(200).json(realState);

  } catch (error) {
    res.status(400).send({ 
      delete: false, 
      error: error 
    });
  }
}

// POST request to update property
exports.realStateUpdate = async (req, res) => {

  const {error} = realStateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  try {
    const realState = await realStateModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: Object.assign(req.body) },
      { new: true },
    )

    res.status(200).json(realState);
  }
  catch (error) {
    res.status(400).send({ 
      update: true, 
      error: error 
    });
  }
}
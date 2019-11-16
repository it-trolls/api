import propertyModel from '../models/Property';
// import realStateModel from '../models/RealState';
import {validationResult} from 'express-validator';
import config from '../config';

import jwt from 'jsonwebtoken';



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

    console.log('->', req.query)
    let query = propertyModel.find({});

    // use limit
    let limit = parseInt(req.query.limit);
    if (req.query.limit == undefined){
      query.limit(10)
    }else{
      query.limit(limit)
    }

    // skip
    let skip = parseInt(req.query.skip);
    if (req.query.skip == undefined){
      query.skip(0)
    }else{
      query.skip(skip)
    }


    let search = req.query.search;
    if (req.query.search != undefined){
      search.trim()
      query.find({ "title": { "$regex": search, "$options": "i" } })
    }

    let description = req.query.description;
    if (req.query.description != undefined){
      // Object.keys(req.query.description)
      query.find({ "description": { "$regex": description, "$options": "i" } })
    }

    let address = req.query.address;
    if (req.query.address != undefined){
      query.find({ "address": { "$regex": address, "$options": "i" } })
    }

    let neighborhood = req.query.neighborhood;
    if (req.query.neighborhood != undefined){
      query.find({ "neighborhood": { "$regex": neighborhood, "$options": "i" } })
    }

    let floor = req.query.floor;
    if (req.query.floor != undefined){
      query.find({ "floor": { "$regex": floor, "$options": "i" } })
    }

    let type = req.query.type;
    console.log('what that does mean', type , req.query.type )
    if (req.query.type != undefined){
      query.find({"type": type})
    }
    
    let contract = req.query.contract;
    console.log('contract', contract)
    if (req.query.contract != undefined){
      query.find({"contract": contract})
    }

    let bedrooms = parseInt(req.query.bedrooms);
    if (req.query.bedrooms != undefined){
      if (bedrooms > 2) {
        query.where('bedrooms').gte(2)
        
      }else{
        query.find({"bedrooms": bedrooms})
      }
    }

    let bathrooms = parseInt(req.query.bathrooms);
    if (req.query.bathrooms != undefined){
      if (bathrooms > 2) {
        query.where('bathrooms').gte(2)
        
      }else{
        query.find({"bathrooms": bathrooms})
      }
    }

    let kitchens = parseInt(req.query.kitchens);
    if (req.query.kitchens != undefined){
      if (kitchens > 2) {
        query.where('kitchens').gte(2)
        
      }else{
        query.find({"kitchens": kitchens})
      }
    }

    let antiquity = parseInt(req.query.antiquity);
    if (req.query.antiquity != undefined){
      if (antiquity > 2) {
        query.where('kitchens').gte(2)
        
      }else{
        query.find({"kitchens": antiquity})
      }
    }

    let coveredArea = parseInt(req.query.coveredArea);
    if (req.query.coveredArea != undefined){
        query.where('coveredArea').gte(coveredArea)
    }

    // let price = parseInt(req.query.price);
    // if (req.query.price != undefined){
    //     query.where('price').gte(price)
    // }


    // let minprice = parseInt(req.query.minprice);
    // if (req.query.minprice != undefined){
    //     query.where('price').gte(minprice)
    // }
    // query.find({"price": {"$gte": minprice, "$lt": maxprice}})


  
    const propertys = await query.exec();
    // const propertys = await propertyModel.find(req.query);
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

  
  //validacion
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors : errors.array()});
  }
  try {
    
    let arrayOfPaths = []
    // cycle array of images
    if (req.files){
      req.files.forEach(file => {
        arrayOfPaths.push(file.path)
      });
    }
    
    const usertoken = req.headers['x-access-token'];
    const decoded = jwt.verify(usertoken, config.secret);
    const userIdFromToken = decoded.id;
    //push extra data to body.
    req.body.pictures = arrayOfPaths;
    req.body.updated_at = Date.now();
    req.body.created_at = Date.now();
    req.body.created_by = userIdFromToken;

    const Property = new propertyModel(req.body);
    const property = await Property.save();

    res.status(200).send({property})
    
  } catch (error) {
    res.status(400).send({ 
      create: false, 
      error: error 
    });
  }



  // ex real state
  // const realState = await realStateModel.findOne({ _id: req.body.realState });

  // realState.propertys.push(property._id);
  // realState.save();

  // res.status(200).send({
  //   create: true,
  //   value: json(property)
  // });
  
}

// DELETE request to delete property
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


    let response = {
      delete:true,
      message : 'this property has been successfully deleted',
      value : {id : idProperty , title : `${property.title}`}
    }
    return res.status(200).json(response);

  } catch (error) {
    res.status(400).send({ 
      delete: false, 
      error: error 
    });
  }
}

// PUT request to update property
exports.propertyUpdate = async (req, res) => {

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
const joi = require('@hapi/joi');

////// AUTH

const registerValidation = (data) =>{
    const schema = {
        // name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()

    };
    return joi.validate(data,schema);
    
}

const loginValidation = (data) =>{
    const schema = {
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()

    };
    return joi.validate(data,schema);
    
}


module.exports.registerValidation = registerValidation ;
module.exports.loginValidation = loginValidation ;

// realState

const realStateValidation = (data) =>{
    const schema = {
        name: joi.string().min(2).max(180).required(),

    };
    return joi.validate(data,schema);
    
}

module.exports.realStateValidation = realStateValidation ;

//property


const propertyValidation = (data) =>{
    const schema = {
        address: joi.string().min(2).max(180).required(),
        location: joi.string().min(2).max(180).required(),
    };
    return joi.validate(data,schema);
    
}


module.exports.propertyValidation = propertyValidation ;



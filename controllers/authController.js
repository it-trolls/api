import userModel from '../models/User';
import bcrypt from "bcryptjs";
import config from '../config';
import jwt from 'jsonwebtoken';
import User from '../models/User';
const {registerValidation,loginValidation} = require ('../validation');

exports.login = async (req, res) => {

    // use joi to validate
    const {error} = loginValidation(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    // confirm if email already exist
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Email is not exist');


    let email = req.body.email;
    let password=  req.body.password;

    userModel.findOne({ email })
    .then(user =>{
        if (!user) return res.status(404).send({ 
            auth: false, 
            error: 'User doesn`t exist'
        });

        bcrypt.compare(password,user.password)
            .then(match => {

                if(match) {
                    // create a token
                    const token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    return res.status(200).send({ 
                        auth: true, 
                        token: { 
                            value: token, 
                            expiresIn: 86400
                        }  
                    });
                };

                return res.status(200).send({ 
                    auth: false, 
                    error : 'Incorrect password'
                });

            }).catch(error => {
                res.status(500).send({ 
                    auth: false, 
                    error: error
            });
        })
        
    }).catch(error => res.status(500).send({ 
        auth: false, 
        error: error
    }));
}

//crear un usuario
exports.register = async (req, res) => {

    // use joi to validate
    const {error} = registerValidation(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    // confirm if email already exist
    const emailExist = await User.findOne({email:req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');


    try {
        // console.clear();
        console.log('req body', req.body);

        const User = new userModel({
            email: req.body.email,
            password: req.body.password,
        });

        const user = await User.save();

        return res.status(200).send({
            register: true,
            message: 'successfully registered'
        });
    } catch (error) {
        res.status(400).send({ 
            register: false, 
            error: error 
        });
    }
}

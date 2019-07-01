import userModel from '../models/User';
import bcrypt from "bcryptjs";
import config from '../config';
import jwt from 'jsonwebtoken';

exports.login = async (req, res) => {

    let email = req.body.email;
    let password=  req.body.password;

    userModel.findOne({ email })
    .then(user =>{
        if (!user) return res.status(404).send({message: 'User doesn`t exist '})
        bcrypt.compare(password,user.password)
            .then(match => {

                if(match) {
                    // create a token
                    const token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
    
                    //guardar token en
                    res.cookie('access_token', token);
                    // new Cookies(req, res).set('access_token', token, {
                    //     httpOnly: true,
                    //     secure: true      // for your production environment
                    // });

                    return res.status(200).send({ auth: true, token: token });
                };

                return res.status(200).send({message : 'Incorrect password '})

            }).catch(error => {
                res.status(500).send({error});
            })
        
    }).catch(error => res.status(500).send({error}));
}

//crear un usuario
exports.register = async (req, res) => {
    try {
        // console.clear();
        console.log('req body', req.body);

        const User = new userModel({
            email: req.body.email,
            password: req.body.password,
        });

        const user = await User.save();

        // create a token
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send({ message: 'error al registrar usuario', error });
    }
}

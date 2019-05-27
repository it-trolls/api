
import  User from "../models/User";
import bcrypt from "bcryptjs";

const login = (req,res) =>{

    let username = req.body.username;
    let password=  req.body.password;

    User.findOne({username})
    .then(user =>{
        if (!user) return res.status(404).send({message: 'User doesn`t exist '})
        bcrypt.compare(password,user.password)
            .then(match => {
                if(match) return res.status(200).send({message:'Auth sucess'});
                return res.status(200).send({message : 'Incorrect password '})

            }).catch(error => {
                res.status(500).send({error});
            })
        
    }).catch(error => res.status(500).send({error}));
}

module.exports = login;
import express from "express";
// const AuthCtrol = require('../controllers/authController');
import AuthCtrol from "../controllers/authController";
const Router = express.Router();

Router.post('/login',AuthCtrol);


module.exports = Router;
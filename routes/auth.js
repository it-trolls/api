import express from "express";
import authController from "../controllers/authController";
const Router = express.Router();

Router.post('/login', authController.login);
Router.post('/register', authController.register);

module.exports = Router;
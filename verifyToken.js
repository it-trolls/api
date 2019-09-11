import config from './config';
import jwt from 'jsonwebtoken';

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  // var token = new Cookies(req, res).get('access_token'); //error
  if (!token) return res.status(401).send({ 
    success: false, 
    message: 'No token provided.' 
  });
  try {
    await jwt.verify(token, config.secret);
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error
    });
  }
}

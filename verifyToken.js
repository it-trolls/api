import config from './config';
import jwt from 'jsonwebtoken';

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  try {
    await jwt.verify(token, config.secret);
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

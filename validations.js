import config from './config';
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  try {
    return await jwt.verify(token, config.secret);
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
}

module.exports.verifyToken = verifyToken;
import express from 'express';

const router = express.Router();

// GET home page.
router.get('/', (req, res) => {
  res.send('Hola, soy la ruta por defecto.');
});

module.exports = router;
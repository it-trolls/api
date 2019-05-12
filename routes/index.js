import express from 'express';

const router = express.Router();

// GET home page.
router.get('/', function (req, res) {
  //res.redirect('/propertys');
  res.send('respond with a resource');
});

module.exports = router;
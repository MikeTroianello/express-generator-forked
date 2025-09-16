var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/hi', function(req, res, next) {
  res.json({message: 'hello world'});
});

module.exports = router;

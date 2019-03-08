var express = require('express');
var router = express.Router();

/* GET one user */
router.get('/:userId', function(req, res, next) {
  res.json('respond with a user');
});

/* DELETE  one user */
router.delete('/:userId', function(req, res, next) {
  res.json('respond with a user id deleted');
});
/* update  one user */
router.post('/:userId', function(req, res, next) {
  res.json('respond with a user id updated');
});

/* create  one user */
router.put('/:userId', function(req, res, next) {
  res.json('respond with a user id created');
});

module.exports = router;

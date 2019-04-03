var express = require('express');
var router = express.Router();
// we import our artist controller
var artist = require('../controllers/artist.controller');

/* GET all artist */
//router.get('/', artist.findAll);
/* GET one artist */
router.get('/:id', artist.findOne);
/* DELETE  one artist */
router.delete('/:id', artist.delete);
/* update  one artist */
router.post('/:id', artist.update);
/* create  one artist */
router.put('/', artist.create);
/* sort artist by number of followers */
router.get('/',artist.topFollowers);

module.exports = router;

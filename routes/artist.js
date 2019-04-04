var express = require('express');
var router = express.Router();
// we import our artist controller
var artist = require('../controllers/artist.controller');

/* GET all artist */
router.get('/', artist.findAll);
/* GET artist order by name */
router.get('/sorted', artist.artistSort);
/* GET one artist */
router.get('/findOne/:id', artist.findOne);
/* DELETE  one artist */
router.delete('/:id', artist.delete);
/* update  one artist */
router.post('/:id', artist.update);
/* create  one artist */
router.put('/', artist.create);
/* sort artist by number of followers */
router.get('/topFollowers',artist.topFollowers);

module.exports = router;

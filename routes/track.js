var express = require('express');
var router = express.Router();
// we import our track controller
var track = require('../controllers/track.controller');

/* GET one track */
router.get('/findOne/:id', track.findOne);
/* GET all albums */
router.get('/', track.findAll);
/* DELETE  one track */
router.delete('/:id', track.delete);
/* update  one track */
router.post('/:id', track.update);

/* create  one track */
router.put('/', track.create);

/* Get top 6 songs */
router.get('/mostLiked', track.mostLiked);
/* Get total number of likes */
router.get('/likeCount', track.likeCount);
/* Get top 6 songs */
router.get('/avgTime', track.avgTime);



module.exports = router;

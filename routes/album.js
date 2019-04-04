var express = require('express');
var router = express.Router();
// we import our album controller
var album = require('../controllers/album.controller');

/* GET all albums */
router.get('/', album.findAll);
/* GET one album */
router.get('/findOne/:id', album.findOne);

/* DELETE  one album */
router.delete('/:id', album.delete);
/* update  one album */
router.post('/:id', album.update);

/* create  one album */
router.put('/', album.create);

/* Group albums by genre */
router.get('/findGenre', album.findGenre);

module.exports = router;

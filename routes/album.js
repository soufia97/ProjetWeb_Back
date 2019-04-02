var express = require('express');
var router = express.Router();
// we import our album controller
var album = require('../controllers/album.controller');

/* GET one album */
router.get('/:id', album.findOne);
/* GET all albums */
router.get('/', album.findAll);
/* DELETE  one album */
router.delete('/:id', album.delete);
/* update  one album */
router.post('/:id', album.update);

/* create  one album */
router.put('/', album.create);

module.exports = router;

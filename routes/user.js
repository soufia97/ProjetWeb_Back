var express = require('express');
var router = express.Router();
// we import our user controller
var user = require('../controllers/user.controller');

/* GET one user */
router.get('/:userId', user.findOne);

/* DELETE  one user */
router.delete('/:userId', user.delete);
/* update  one user */
router.post('/:userId', user.update);

/* create  one user */
router.put('/', user.create);

module.exports = router;

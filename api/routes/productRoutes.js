var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');

const productController = require('../controllers/productController');

router.route('/')
    .post(verifyToken,productController.create);

module.exports = router;
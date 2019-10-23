const express = require('express');
const router = express.Router();
const productController = require('./products/controllers/showProductsController')
const paginate = require('./products/utils/pagination')


/* GET home page. */
// productController.getPageIfLoggedIn
router.get('/', productController.getPageIfLoggedIn)


router.get('/page/:page', paginate)

module.exports = router;

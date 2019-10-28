const express = require('express');
const router = express.Router();
const cartController = require('./controllers/cartController')


router.get('/', cartController.getUserShoppingCart)

router.post('/product', cartController.addProductToCart, (req, res) => {
    res.redirect('/')
})

router.delete('/remove', cartController.removeProduct)

module.exports = router
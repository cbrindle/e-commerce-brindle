const express = require('express');
const router = express.Router();
const cartController = require('./controllers/cartController')


router.get('/', cartController.getUserShoppingCart)

router.post('/product', cartController.addProductToCart, (req, res) => {
    res.redirect('/')
})

router.delete('/remove', (req, res) => {
    res.send('Dont know how to delete product yet')
})

module.exports = router
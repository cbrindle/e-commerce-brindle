const express = require('express');
const router = express.Router();
const showProductController = require('./controllers/showProductsController');

router.get('/', (req, res) => {
    res.send('hey!')
})

// router.get('/:id', (req, res) => {
//     res.send('hey from ID')
// })

router.get('/getcategorybyid/', showProductController.categoryPage)

router.get('/getcategorybyid/:category', showProductController.showCategory)

router.get('/:id', showProductController.showOneProduct)

router.get('/all/all', showProductController.allProducts)

module.exports = router
const express = require('express');
const router = express.Router();
const showProductController = require('./controllers/showProductsController');
const Product = require('./models/Product');

Product.createMapping((error, mapping) => {
    if (error) {
        console.log(`Error created mapping!`);
        console.log(error);
        console.log(mapping);
    } else {
        console.log(`Mapping CREATED`);
        console.log(mapping);
    }
})

let stream = Product.synchronize()
let count = 0

stream.on('data', () => {
    count++
})

stream.on('close', () => {
    console.log(`Indexed ${count} documents`);
})

stream.on('error', (error) => {
    console.log(`Error: ${error}`);
})

router.get('/', (req, res) => {
    res.send('hey!')
})

// router.get('/:id', (req, res) => {
//     res.send('hey from ID')
// })

router.get('/getcategorybyid/', showProductController.categoryPage)


router.get('/search', showProductController.searchProductByQuery)

router.post('/instant-search', showProductController.instantSearch)

router.get('/all/all', showProductController.allProducts)

router.get('/getcategorybyid/:category', showProductController.showCategory)

router.get('/:id', showProductController.showOneProduct)

module.exports = router
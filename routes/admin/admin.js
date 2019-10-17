const express = require('express');
const router = express.Router();
const categoryValidator = require('./utils/categoryValidator')

router.get('/', (req, res) => {
    res.send('hey from admin!')
})

router.get('/add-category', (req, res) => {
    res.render('products/addcategory')
})

router.post('/add-category', categoryValidator)

module.exports = router
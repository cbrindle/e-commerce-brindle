const express = require('express');
const router = express.Router();
const categoryTool = require('./utils/categoryTool')
const createProductController = require('./controllers/createProductController');

// Test to ensure /api/admin is working
router.get('/', (req, res) => {
    res.send('hey from admin!')
})

// Displays page for /api/admin/add-category
router.get('/add-category', (req, res) => {
    res.render('products/addcategory')
})


// Handles 'Submit' button on /api/admin/add-category page
router.post('/add-category', categoryTool.valAndCreate)


// Display page for /api/admin/get-all-categories
router.get('/get-all-categories', categoryTool.getAllCategories)

// (Des)
router.get('/create-fake-product/:categoryName/:categoryID', createProductController.createProductByCategoryID)


module.exports = router
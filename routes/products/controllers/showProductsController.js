const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = {
    categoryPage: (req, res) => {
        Category.find({})
                    .then(categories => {
                        res.render('products/allcategories', {categories: categories})
                    })
                    .catch(err => {
                        res.send('ERROR')
                    })
    },

    showCategory: (req, res) => {
        Product.find({ category: req.params.category })
                    .then(products => {
                        Category.findOne({ _id: req.params.category }, (err, result) => {
                            if (err) {
                                throw err
                            } else {
                                res.render('products/products', { products: products, catName: result.name.charAt(0).toUpperCase() + result.name.slice(1) })
                            }
                        })
                        
                    })
                    .catch(err => {
                        console.log(err);
                    })
    },

    showOneProduct: (req, res) => {
        Product.findOne({ _id: req.params.id })
                    .then(product => {
                        res.render('products/product', { product: product })
                    })
                    .catch(err => {
                        throw err
                    })
    }
}
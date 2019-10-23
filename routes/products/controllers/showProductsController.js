const Product = require('../models/Product');
const Category = require('../models/Category');

const paginate = require('../utils/pagination')

module.exports = {
    // FIXME: Add function to display all products, regardless of category


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
                    //.populate('category')
                    //.exec()
                    .then(products => {
                        Category.findOne({ _id: req.params.category }, (err, result) => {
                            if (err) {
                                throw err
                            } else {
                                res.render('products/products', { products: products, catName: result.name.replace(result.name[0], result.name[0].toUpperCase()) })
                            }
                        })
                        
                    })
                    .catch(err => {
                        throw err
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
    },

    allProducts: (req, res) => {
        Product.find({})
            .populate('category')
            .exec()
            .then(products => {
                res.render('products/allproducts', {products, products})
            })
            .catch(err => {
                throw err
            })
    },

    getPageIfLoggedIn: (req, res, next) => {
        if (req.user) {
            paginate(req, res)
        } else {
            res.render('index')
        }
    }
}
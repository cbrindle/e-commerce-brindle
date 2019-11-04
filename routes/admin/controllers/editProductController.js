const Category = require('../../products/models/Category')
const Product = require('../../products/models/Product')

module.exports = {
    editProduct: (req, res) => {
        Category.find({})
            .then(categories => {
                res.render('products/edit-product-catlist', {data: categories})
            })
            .catch(err => {
                res.json({
                    "error": "Did not load properly"
                })
            })
    },

    editProductPage: (req, res) => {
        Product.find({ category: req.params.categoryID })
            .then(products => {
                res.render('products/edit-product-list', { data: products })
            })
            .catch(err => {
                throw Error(err)
            })
    },

    editProductActual: (req, res) => {
        Product.findOne({ _id: req.params.productID })
            .populate('category')
            .exec()
            .then(product => {
                res.render('products/edit-product-actual', { product: product })
            })
            .catch(err => {
                throw Error(err)
            })
    },

    editProductPost: (req, res) => {
        Product.findOne({ _id: req.params.productID })
            .then(product => {
                console.log(product);
                console.log(req.body);
                if (req.body.name != '') {
                    product.name = req.body.name
                }
                if (req.body.price != '') {
                    product.price = Number(req.body.price)
                }
                product.save()
                    .then(saved => {
                        res.json({
                            message: 'Updated successfully'
                        })
                    })
                    .catch(err => {
                        throw Error(err)
                    })

            })
            .catch(err => {
                throw Error(err)
            })
    }
}
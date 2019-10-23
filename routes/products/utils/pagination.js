const Product = require('../models/Product')

const paginate = (req, res) => {
    const perPage = 9;
    const page = req.params.page || 1

    Product.find({})
            .populate('category')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, products) {
                Product.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('products/product-main', {
                        products: products,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
}

module.exports = paginate
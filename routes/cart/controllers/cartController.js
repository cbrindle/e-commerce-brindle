const Cart = require('../models/Cart')
const Product = require('../../products/models/Product')


module.exports = {
    createUserCart: (req, res) => {
        const newCart = new Cart
        newCart.owner = req.user._id
        newCart.save((error) => {
            if (error) {
                res.status(500).json({
                    confirmation: 'failure',
                    message: 'error'
                })
            } else {
                res.redirect('/')
            }
        })
    },

    addProductToCart: (req, res, next) => {
        Cart.findOne({ owner: req.user._id })
            .then(cart => {
                cart.items.push({
                    item: req.body.productID,
                    quantity: parseInt(req.body.quantity),
                    price: parseFloat(req.body.priceHidden * req.body.quantity)})
                let totalPrice = 0;
                for (let i = 0; i < cart.items.length; i++) {
                    totalPrice += cart.items[i].price
                }
                cart.total = totalPrice
                cart.save()
            })
            .catch(err => {
                throw Error(err)
            })
        next()
    },

    getUserShoppingCart: (req, res) => {
        Cart.findOne({ owner: req.user._id })
            .populate("items.item")
            .exec()
            .then(cart => {
                res.render('cart/cart', {carts: cart})
            })
            .catch(err => {
                throw Error(err)
            })
    }
}
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
                    .then(cart => {
                    })
                    .catch(err => {
                        throw Error
                    })
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
    },

    removeProduct: (req, res) => {
        Cart.findOne({ owner: req.user._id })
            // .populate("items.item")
            // .exec()
            .then(cart => {
                // PULL method ONLY for mongoose
                cart.items.pull(req.body.item)
                // let newCart = cart.items.filter(item => item._id != req.body.item)
                // cart.items = newCart
                cart.total = 0
                for (let i = 0; i < cart.items.length; i++) {
                    cart.total += cart.items[i].price
                }
                cart.save()
                    .then(cart => {
                        req.flash('success', 'Successfully removed')
                        res.redirect('back')
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
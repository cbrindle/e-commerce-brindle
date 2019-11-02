require('dotenv').config()

const express = require('express');
const router = express.Router();
const cartController = require('./controllers/cartController')
const async = require('async')
const stripe = require('stripe')(process.env.KEY)
const Cart = require('./models/Cart')
const User = require('../../routes/users/models/User')


router.get('/', cartController.getUserShoppingCart)

router.post('/product', cartController.addProductToCart, (req, res) => {
    res.redirect('/')
})

router.delete('/remove', cartController.removeProduct)

router.post('/payment', (req, res, next) => {
    const stripeToken = req.body.stripeToken
    const currentCharges = req.body.stripeMoney * 100

    stripe.customers
            .create({
                source: stripeToken
            })
            .then(customer => {
                const result = stripe.charges.create({
                    amount: currentCharges,
                    currency: 'usd',
                    customer: customer.id
                })

                return result
            })
            .then(result => {
                async.waterfall([
                    (callback) => {
                        Cart.findOne({ owner: req.user._id }, (err, cart) => {
                            callback(err, cart)
                        })
                    },
                    (cart, callback) => {
                        User.findOne({ _id: req.user._id })
                            .then(user => {
                                for (let i = 0; i < cart.items.length; i++) {
                                    user.history.push({ paid: cart.items[i].price, item: cart.items[i].item })
                                }
                                user.save()
                                    .then(user => {
                                        callback(null, cart)
                                    })
                                    .catch(err => {
                                        throw Error(err)
                                    })
                            })
                            .catch(err => {
                                throw Error(err)
                            })
                    },
                    (cart) => {
                        cart.items = []
                        cart.total = 0
                        cart.save()
                            .then(cart => {
                                res.render('cart/thankyou')
                            })
                            .catch(err => {
                                throw Error(err)
                            })
                    }
                ])
            })
            .catch(err => {
                throw Error(err)
            })
})

module.exports = router
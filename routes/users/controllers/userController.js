const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

module.exports = {
    signup: (req, res, next) => {
        if (req.validationErrors()) {
            res.render('auth/signup')

            return
        }

        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('errors', 'User already exists')

                    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                    return res.redirect(301, '/api/users/signup')
                } else {
                    const newUser = new User

                    newUser.email = req.body.email
                    newUser.password = req.body.password
                    newUser.profile.name = req.body.name

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                reject(err)
                            } else {
                                newUser.password = hash

                                newUser
                                    .save()
                                    .then(user => {
                                        req.login(user, (err) => {
                                            if (err) {
                                                res.status(400).json({
                                                    confirmation: false,
                                                    message: err
                                                })
                                            } else {
                                                res.redirect(301, '/')
                                            }
                                        })
                                    })
                                    .catch(err => {
                                        throw err
                                    })
                            }
                        })
                    })
                }
            })
            .catch(err => {
                throw err
            })
    },
    signin: (params) => {
        return new Promise((resolve, reject) => {
            User.findOne({ email: params.email })
                .then(user => {
                    if (user) {
                        bcrypt.compare(params.password, user.password)
                            .then(result => {
                                if (!result) {
                                    let errors = {}
                                    errors.message = 'Password or email does not match'
                                    errors.status = 400

                                    reject(errors)
                                } else {
                                    resolve(user)
                                }
                            })
                            .catch(err => reject(err))

                    } else {
                        let errors = {}
                        errors.message = 'There is no such user'
                        errors.status = 400

                        reject(errors)
                    }
                })
                .catch(err => reject(err))
        })
    }

}
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const hasher = require('../utils/hasher')
const getGravatar = require('../utils/gravatar')

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
                    newUser.profile.name = req.body.name
                    newUser.profile.picture = getGravatar(req.body.email)
                    hasher.create(req.body.password).then(hash => {
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
                    }).catch(err => {
                        throw err
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
    },
    //FIXME needs some kind of await
    updateProfile: (params, id) => {
        return new Promise((resolve, reject)  => {
            User.findById(id)
                .then(user => {
                    bcrypt.compare(params.password, user.password)
                        .then(result => {
                            if (!result) {
                                console.log(`old pass NOT CORRECT`);
                                reject(err = 'Old password INCORRECT')
                                return
                            } else {
                                console.log(`old pass MATCHES`);
                                resolve(user)
                            }
                        })
                        .catch(error => reject(err = error))
                    })
                .then(user => {
                    if (params.password2 != params.password3) {
                        reject(err = 'Passwords MUST match')
                        return
                    }
                    if (params.name != '') {
                        user.profile.name = params.name;
                    }
                    if (params.address != '') {
                        user.address = params.address;
                    }
                    if (params.email != '') {
                        user.email = params.email;
                    }
                    
                    if (params.password2 != '' && params.password3 != '') {
                        hasher.create(params.password2)
                            .then(hash => {
                                user.password = hash;
                            })
                            .catch(err => {
                                reject(err)
                            })
                    }

                    user.save()
                        .then(user => {
                            resolve(user)
                        })
                        .catch(err => {
                            reject(err)
                        })
                    })
                .catch(err => reject(err))
            })
        }
    }
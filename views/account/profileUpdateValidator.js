const bcrypt = require('bcryptjs')

const profileUpdateValidator = (req, res, next) => {
    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('email', 'Must enter a valid email address').isEmail()
    req.checkBody('address', 'Address is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()

    req.flash('errorValidate', req.validationErrors())
    if (req.validationErrors()) {
        next()
    } else {
        req.user.profile.name = req.body.name;
        req.user.email = req.body.email;
        req.user.address = req.body.address;
        req.user.password = req.body.password;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.user.password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                } else {
                    req.user.password = hash;
                    console.log(req.user.password);
                }
            })
        })
        req.user.save()
        next()
    }
}

module.exports = profileUpdateValidator
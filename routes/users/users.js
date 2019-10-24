var express = require('express');
const passport = require('passport');
var router = express.Router();
const signupValidation = require('./utils/signUpValidation')
const cartController = require('../cart/controllers/cartController')


const userController = require('./controllers/userController')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')

  res.render('auth/signup')
})

router.post('/signup', signupValidation, userController.signup, cartController.createUserCart)

router.get('/signin', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')
  res.render('auth/signin')
})

router.post('/signin', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/signin',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout();

  res.redirect('/');
})

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('account/profile')
  } else {
    res.redirect('/')
  }
})

router.post('/profile', userController.updateProfile)

module.exports = router;
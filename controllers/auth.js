const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')


//This first function checks to see if a user is logged in and if so redirects them to profile.ejs and if not renders the login.ejs. It is called in the routes folder in the main.js file line 11

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/profile')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
//this validates a user login, making sure that emails and passwords match for login, if anything is invalid it bumps you back to the login, if it matches, to loads the profile page. called in routes/main.js line 12

  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/profile')
      })
    })(req, res, next)
  }
  
//logs a user out of its session, called in routes/main.js line 13

  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
//This function checks to see if a user is already logged in which would redirect them to the profile page, if not it renders the signup.ejs. Called in routes/main.js line 14

  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/profile')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
//This function checks for valid email addresses and valid passwords, then if everything is valid creates a new user object using the user schema from models/User.js then it checks to see if the user email already exists to make sure there are not any duplicates. If everything checks out the user is saved in the database.

  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/profile')
        })
      })
    })
  }
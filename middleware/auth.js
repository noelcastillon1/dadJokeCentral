//middleware the checks whether or not a user is logged in, called in routes/main.js line 6 

module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  
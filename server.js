const express = require('express')
const path = require("path")
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const jokeRoutes = require('./routes/joke')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)
//connects you to data base in config/database.js

//sets views as ejs files and sets public files as static file
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//forwards url requests of each root route to routes folder 
app.use('/', mainRoutes)
app.use('/profile', jokeRoutes)
 
const PORT = process.env.PORT || 5000

connectDB().then(() =>  {
  app.listen(PORT , ()=>{
    console.log('Server is running, you better catch it!', PORT)

  })
})
    
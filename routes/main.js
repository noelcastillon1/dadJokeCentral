const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
//ookay fair warining I am doing all the commenting in this one line so I don't messup the commenting in the other pages. --- first two functions are called when a user accesses the home page these both call functions in the controllers/home.js file lines 11 and 8 respectively from top to bottom, they render the index.ejs file and all jokes from the database --- the next two functions are called when a user likes or dislikes a joke, they then call functions controllers/home.js on lines 22 and 34 respectively these teo functions will increase or decrease a joke score by 1 ------ The last five functions are all called in the controllers/auth.js file, they all pertain to aspects fo authentication and adding new users to the data base more information can be found in the file
router.get('/', homeController.getJokes)
router.get('/', homeController.getIndex)
router.put('/like', homeController.addLike)
router.put('/dislike', homeController.removeLike)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router
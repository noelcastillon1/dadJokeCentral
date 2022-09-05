const express = require('express')
const router = express.Router()
const jokeController = require('../controllers/jokes') 
const { ensureAuth } = require('../middleware/auth')
//Called when a user wants to access the profile page, it first checks for authentifcation using the middleware in the auth.js file and then makes a request to the controller to get all the jokes relating to the user called in controllers/jokes.js line 14
router.get('/', ensureAuth, jokeController.getJokes)
//is called when a user hits submit when adding a new joke and then called the createJoke function in controllers/jokes.js line 25
router.post('/createjoke', jokeController.createJoke)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)
//this router is called when a user hits the delete button for a joke, this then calls the delete joke function in controllers/jokes.js line 34
router.delete('/deleteJoke', jokeController.deleteJoke)

module.exports = router
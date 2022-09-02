const express = require('express')
const router = express.Router()
const jokeController = require('../controllers/jokes') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, jokeController.getJokes)

router.post('/createjoke', jokeController.createJoke)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteJoke', jokeController.deleteJoke)

module.exports = router
const mongoose = require('mongoose')

//This is a mongoose schema which essentially outlines the data that will be added to the database when a new joke is created.
//called in the controllers/jokes.js file line 27

const JokeSchema = new mongoose.Schema({
  joke: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Joke', JokeSchema)

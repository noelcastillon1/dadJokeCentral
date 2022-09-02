const mongoose = require('mongoose')

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
  }
})

module.exports = mongoose.model('Joke', JokeSchema)

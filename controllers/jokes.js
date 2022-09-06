const Joke = require('../models/Joke')
const moment = require('moment')
const now = moment().format("MMM Do YY")

//These functions are displayed on the profile.ejs page.
//The first gets all jokes that relate to the user who has logged in. Called on routes/joke.js line 6 
//The second creats a joke, adding a new joke using the Joke schema which can be found in models/Joke, this creat function is called in routes/joke line 8
//The third function takes in a joke id and deletes the joke if you find that it is no longer funny called in routes/joke.js line 14

//planning on adding a 'PUT' function to update jokes you have already main
//planning on adding a 'GET' for all jokes so a user can see all jokes on their profile 

module.exports = {
    getJokes: async (req,res)=>{
        
        console.log(req.user)
        try{
            const jokeItems = await Joke.find({userId:req.user.id})
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('profile.ejs', {jokes: jokeItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createJoke: async (req, res)=>{
        try{
            await Joke.create({joke: req.body.jokeItem, likes: 0, date: now, userId: req.user.id, userName: req.user.userName})
            console.log('Joke has been added!')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    deleteJoke: async (req, res)=>{
        console.log(req.body.jokeIdFromJSFile)
        try{
            await Joke.findOneAndDelete({_id:req.body.jokeIdFromJSFile})
            console.log('Deleted Joke')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    
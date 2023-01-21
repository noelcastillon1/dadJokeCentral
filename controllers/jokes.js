const Joke = require('../models/Joke')
const User = require('../models/User')
const moment = require('moment')
const now = moment().format("MMM Do YY")


module.exports = {
    getJokes: async (req,res)=>{
        
        try{
            const jokeItems = await Joke.find({userId:req.user.id})

            const allJokes = await Joke.find({})
    
            const likedJokeIds = await req.user.liked
            const likedJokes = await Joke.find({ '_id': { $in: likedJokeIds } });

            res.render('profile.ejs', {jokes: jokeItems, user: req.user, jokesAll: allJokes, likedJokes: likedJokes})
        }catch(err){
            console.log(err)
        }
    },
    createJoke: async (req, res)=>{
        try{
            await Joke.create({joke: req.body.jokeItem, likes: 0, date: now, userId: req.user.id, userName: req.user.userName})
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    addLike: async (req, res)=>{
        const likes = +req.body.likes
        const jokeId = req.body.jokeIdFromJSFile
        const likedArr = req.user.liked
        try{
            await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
                likes: likes+1
            })
            await User.findOneAndUpdate({_id:req.user._id}, {liked: [...likedArr, jokeId] })
            res.json('like +1')
        }catch(err){
            console.log(err)
        }
    },
    removeLike: async (req, res)=>{
        const likes = +req.body.likes
        const jokeId = req.body.jokeIdFromJSFile
        const dislikedArr = req.user.liked
        try{
            await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
                likes: likes-1
            })
            await User.findOneAndUpdate({_id:req.user._id}, {disliked: [...dislikedArr, jokeId] })
            res.json('like -1')
        }catch(err){
            console.log(err)
        }
    },
    deleteJoke: async (req, res)=>{
        try{
            await Joke.findOneAndDelete({_id:req.body.jokeIdFromJSFile})
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    
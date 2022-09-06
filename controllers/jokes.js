const Joke = require('../models/Joke')
const User = require('../models/User')
const moment = require('moment')
const now = moment().format("MMM Do YY")


module.exports = {
    getJokes: async (req,res)=>{
        
        console.log(req.user)
        try{
            const jokeItems = await Joke.find({userId:req.user.id})

            const allJokes = await Joke.find({})
    
            const likedJokeIds = await req.user.liked
            const likedJokes = await Joke.find({ '_id': { $in: likedJokeIds } });
            console.log(likedJokeIds)

            res.render('profile.ejs', {jokes: jokeItems, user: req.user, jokesAll: allJokes, likedJokes: likedJokes})
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
    addLike: async (req, res)=>{
        const likes = +req.body.likes
        const jokeId = req.body.jokeIdFromJSFile
        const likedArr = req.user.liked
        console.log(req.body.likes, req.user.liked, jokeId)
        try{
            await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
                likes: likes+1
            })
            await User.findOneAndUpdate({_id:req.user._id}, {liked: [...likedArr, jokeId] })
            console.log('like +1')
            res.json('like +1')
        }catch(err){
            console.log(err)
        }
    },
    removeLike: async (req, res)=>{
        const likes = +req.body.likes
        const jokeId = req.body.jokeIdFromJSFile
        const dislikedArr = req.user.liked
        console.log(req.body.likes, req.user.disliked, jokeId)
        try{
            await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
                likes: likes-1
            })
            await User.findOneAndUpdate({_id:req.user._id}, {disliked: [...dislikedArr, jokeId] })
            console.log('like -1')
            res.json('like -1')
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
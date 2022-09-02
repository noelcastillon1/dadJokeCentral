const Joke = require('../models/Joke')
const moment = require('moment')
const now = moment().format()



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
            await Joke.create({joke: req.body.jokeItem, likes: 0, date: now, userId: req.user.id})
            console.log('Joke has been added!')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
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
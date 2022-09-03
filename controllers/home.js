const Joke = require('../models/Joke')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getJokes: async (req,res)=>{
        console.log(req.user)
        try{
            const jokeItems = await Joke.find({})
            console.log(jokeItems)
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('index.ejs', {jokes: jokeItems})
        }catch(err){
            console.log(err)
        }
    },
    addLike: async (req, res)=>{
        const likes = +req.body.likes
        try{
            await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
                likes: likes+1
            })
            console.log('like +1')
            res.json('like +1')
        }catch(err){
            console.log(err)
        }
    },
    removeLike: async (req, res)=>{
        const likes = +req.body.likes
        console.log(likes)
        try{
            await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
                likes: likes-1
            })
            console.log('like -1')
            res.json('like -1')
        }catch(err){
            console.log(err)
        }
    },
}
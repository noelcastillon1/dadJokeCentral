const Joke = require('../models/Joke')

//this module contains four functions, the first renders the index.ejs file this is called in the routes/main.js line 7. 
//The second function grabs all the jokes from the database and renders them in the inex.ejs file as the jokes object the function is called in the routes/main.js line 8 
//The last two functions update the amount of likes a particular joke has by taking in the amount of likes from the main.js file and increasing them by one or decreasing them by 1, function is called in routes/main.js line 9 and 10

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
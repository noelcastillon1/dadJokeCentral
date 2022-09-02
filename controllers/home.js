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
    }
}
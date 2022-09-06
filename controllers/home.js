const Joke = require('../models/Joke')
const User = require('../models/User')



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
    // addLike: async (req, res)=>{
    //     const likes = +req.body.likes
    //     const jokeId = req.body.jokeIdFromJSFile
    //     const likedArr = req.user.liked
    //     console.log(req.body.likes, req.user.liked, jokeId)
    //     try{
    //         await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
    //             likes: likes+1
    //         })
    //         await User.findOneAndUpdate({_id:req.user._id}, {liked: [...likedArr, jokeId] })
    //         console.log('like +1')
    //         res.json('like +1')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // removeLike: async (req, res)=>{
    //     const likes = +req.body.likes
    //     const jokeId = req.body.jokeIdFromJSFile
    //     const dislikedArr = req.user.liked
    //     console.log(req.body.likes, req.user.disliked, jokeId)
    //     try{
    //         await Joke.findOneAndUpdate({_id:req.body.jokeIdFromJSFile},{
    //             likes: likes-1
    //         })
    //         await User.findOneAndUpdate({_id:req.user._id}, {disliked: [...dislikedArr, jokeId] })
    //         console.log('like -1')
    //         res.json('like -1')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
}
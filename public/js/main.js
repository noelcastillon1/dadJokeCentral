const deleteBtn = document.querySelectorAll('.del')
const jokeItem = document.querySelectorAll('span.not')
const jokeLike = document.querySelectorAll('.like')
// const jokeDislike = document.querySelectorAll('.dislike')
const allJokes = document.querySelectorAll('.allJoke')
const userLikedJokes = document.querySelectorAll('.likedJoke')
const likes = document.querySelectorAll('.score')
let likesArr = []
let likedJokesIdArr = [];

Array.from(likes).forEach(it => {
   let score = it.innerText
   likesArr.push(score)
})

Array.from(allJokes).forEach((it, ix) => {
    it.classList = it.classList +` ${ix}`
})

Array.from(userLikedJokes).forEach((it) => {
    likedJokesIdArr.push(it.dataset.id)
})

console.log(likedJokesIdArr)

likesArr = likesArr.map(it => +it)

console.log(likesArr)

//creates an event listener for all elements with '.del' class
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteJoke)
})

//creates an event listener for all elements with '.addLike' class and also adds an index number to each elemnts class list
Array.from(jokeLike).forEach((el, ix)=>{
    el.classList = el.classList+` ${ix}`
    el.addEventListener('click', addLike)
})

//creates an event listener for all elements with '.removeLike' class and also adds an index number to each elemnts class list
// Array.from(jokeDislike).forEach((el, ix)=>{
//     el.classList = el.classList+` ${ix}`
//     el.addEventListener('click', removeLike)
// })


async function deleteJoke(){
    const jokeId = this.parentNode.dataset.id
    try{
        const response = await fetch('profile/deleteJoke', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'jokeIdFromJSFile': jokeId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


async function addLike(){
    const jokeId = allJokes[this.classList[this.classList.length -1]].dataset.id
    const likesIx = Number(this.classList[this.classList.length -1])
    console.log(jokeId)
    if(likedJokesIdArr.includes(jokeId) === true){
        console.log('already liked')
        return 
    }

    try{
        const response = await fetch('profile/like', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'jokeIdFromJSFile': jokeId,
                'likes': likesArr[likesIx] 
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


// async function removeLike(){
//     //In the above array function where I added an event listener to each of the like and dislike buttons I also added an index number to the class list which I can access using the classList function. I then use this classlist index to match jokes with likes to be able to pass in the appropraite amount of likes so the controller function in home.js can update likes in the database

//     const jokeId = allJokes[this.classList[this.classList.length -1]].dataset.id
//     const likesIx = Number(this.classList[this.classList.length -1])
//     console.log(jokeId)
//     if(likedJokesIdArr.includes(jokeId) === true){
//         console.log('already liked')
//         return 
//     }

//     try{
//         const response = await fetch('/dislike', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'jokeIdFromJSFile': jokeId,
//                 'likes': likesArr[likesIx]
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }


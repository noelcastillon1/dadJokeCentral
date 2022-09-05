const deleteBtn = document.querySelectorAll('.del')
const jokeItem = document.querySelectorAll('.jokeItem')
const jokeLike = document.querySelectorAll('.like')
const jokeDislike = document.querySelectorAll('.dislike')
const likes = document.querySelectorAll('.score')
let likesArr = []
//creates an array out all elements that have the class '.likes', then uses .forEach to push the inner text value of the element to likesArr
Array.from(likes).forEach(it => {
   let score = it.innerText
   likesArr.push(score)
})

Array.from(jokeItem).forEach((it, ix) => {
    it.classList = it.classList +` ${ix}`
})

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
Array.from(jokeDislike).forEach((el, ix)=>{
    el.classList = el.classList+` ${ix}`
    el.addEventListener('click', removeLike)
})


//makes a fetch request for a delete function to delete a joke, the joke id is passed to the router which is then passed to the controller to main the final update: route can be found in routes/joke.js line 14 and the controller can be found in controllers/jokes.js line 34

async function deleteJoke(){
    const jokeId = this.parentNode.dataset.id
    console.log(jokeId)
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

//this function makes a put request which passes in the joke id and the amount of likes from the score in index.ejs
//this information is passed to the router in routes/main.js on line 9 which is then passed to the appropraite controller in controllers/home.js line 22

async function addLike(){

    //In the above array function where I added an event listener to each of the like and dislike buttons I also added an index number to the class list which I can access using the classList function. I then use this classlist index to match jokes with likes to be able to pass in the appropraite amount of likes so the controller function in home.js can update likes in the database
    const jokeId = jokeItem[this.classList[this.classList.length -1]].dataset.id
    const likesIx = Number(this.classList[this.classList.length -1])

    try{
        const response = await fetch('/like', {
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

//this function makes a put request which passes in the joke id and the amount of likes from the score in index.ejs
//this information is passed to the router in routes/main.js on line 10 which is then passed to the appropraite controller in controllers/home.js line 34


async function removeLike(){
    //In the above array function where I added an event listener to each of the like and dislike buttons I also added an index number to the class list which I can access using the classList function. I then use this classlist index to match jokes with likes to be able to pass in the appropraite amount of likes so the controller function in home.js can update likes in the database


    const jokeId = jokeItem[this.classList[this.classList.length -1]].dataset.id
    const likesIx = Number(this.classList[this.classList.length -1])
    try{
        const response = await fetch('/dislike', {
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
const deleteBtn = document.querySelectorAll('.del')
const jokeItem = document.querySelectorAll('span.not')
const jokeLike = document.querySelectorAll('.like')
const jokeDislike = document.querySelectorAll('.dislike')
const likes = document.querySelectorAll('.likes')
const likesArr = []

//creates an array out all elements that have the class '.likes', then uses .forEach to push the inner text value of the element to likesArr
Array.from(likes).forEach(it => {
   let score = it.innerText
   likesArr.push(score[score.length -1])
})

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
    const jokeId = this.parentNode.dataset.id

    //takes in jokes index from the classlist which corisponds to the same index of likes in the likes Arr because they are rendered in the same order
    const likesIx = this.classList[1]

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
    const jokeId = this.parentNode.dataset.id

     //takes in jokes index from the classlist which corisponds to the same index of likes in the likes Arr because they are rendered in the same order
     
    const likesIx = this.classList[1]
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
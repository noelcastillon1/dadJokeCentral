const deleteBtn = document.querySelectorAll('.del')
const jokeItem = document.querySelectorAll('span.not')
const jokeLike = document.querySelectorAll('.like')
const jokeDislike = document.querySelectorAll('.dislike')
const likes = document.querySelectorAll('.likes')
const likesArr = []

Array.from(likes).forEach(it => {
   let score = it.innerText
   likesArr.push(score[score.length -1])
})

console.log(likesArr)


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteJoke)
})

Array.from(jokeLike).forEach((el, ix)=>{
    el.classList = el.classList+` ${ix}`
    el.addEventListener('click', addLike)
})

Array.from(jokeDislike).forEach((el, ix)=>{
    el.classList = el.classList+` ${ix}`
    el.addEventListener('click', removeLike)
})

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
    const jokeId = this.parentNode.dataset.id
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

async function removeLike(){
    const jokeId = this.parentNode.dataset.id
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
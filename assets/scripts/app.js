const listElement = document.querySelector('.posts') // select element with class 'posts'
const postTemplate = document.getElementById('single-post')
const form = document.querySelector('#new-post form')
const fetchButton = document.querySelector('#available-posts button')
const postList = document.querySelector('ul')

function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json' // ~ JSON.parse(xhr.response)

        xhr.onload = function() {
            resolve(xhr.response)
            // console.log(xhr.response);
        }

        xhr.send(JSON.stringify(data))
    })
    return promise
}

// // cach 2:
// function fetchPosts() {
//     sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
//     .then(responseData => {
//         const listOfPosts = responseData
//         console.log(listOfPosts);
//         for (const post of listOfPosts) {
//             const postEl = document.importNode(postTemplate.content, true)
//             postEl.querySelector('h2').textContent = post.title.toUpperCase()
//             postEl.querySelector('p').textContent = post.body
//             listElement.append(postEl)
//         }
//     })
// }

// fetchPosts()

// // cach 1:
async function fetchPosts() {
    const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
    // const listOfPosts = JSON.parse(xhr.response)
    const listOfPosts = responseData
    console.log(listOfPosts);
    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true)
        postEl.querySelector('h2').textContent = post.title.toUpperCase()
        postEl.querySelector('p').textContent = post.body
        postEl.querySelector('li').id = post.id
        listElement.append(postEl)
    }
}

async function createPost(title, content) {
    const userId = Math.random()
    const post = {
        title: title,
        body: content,
        userId: userId
    }

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post)
}

fetchButton.addEventListener('click', fetchPosts)
// fetchPosts()
// createPost('DUMMY', 'A dummy post!')
form.addEventListener('submit', event => {
    event.preventDefault()
    const enteredTitle = event.currentTarget.querySelector('#title').value
    const enteredContent = event.currentTarget.querySelector('#content').value

    createPost(enteredTitle, enteredContent)
})

postList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        // console.log('CLICKED on button');
        const postId = event.target.closest('li').id
        // console.log(postId);
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
})


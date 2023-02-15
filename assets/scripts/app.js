const listElement = document.querySelector('.posts') // select element with class 'posts'
const postTemplate = document.getElementById('single-post')

function sendHttpRequest(method, url) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json' // ~ JSON.parse(xhr.response)

        xhr.onload = function() {
            resolve(xhr.response)
            // console.log(xhr.response);
        }

        xhr.send()
    })
    return promise
}

async function fetchPosts() {
    const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
    // const listOfPosts = JSON.parse(xhr.response)
    const listOfPosts = responseData
    console.log(listOfPosts);
    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true)
        postEl.querySelector('h2').textContent = post.title.toUpperCase()
        postEl.querySelector('p').textContent = post.body
        listElement.append(postEl)
    }
}

fetchPosts()


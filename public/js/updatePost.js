let $post_title = document.querySelector('#post_title')
let $post_body = document.querySelector('#post_body')
let $post_submit = document.querySelector('#submit_post');

async function updatePost(e) {
    e.preventDefault();
    try {
        const response = await fetch("/posts/:postId", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                title: $post_title.value,
                body: $post_body.value,
            })
        })
        const data = await response.json();
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

$post_submit.addEventListener('click', updatePost);
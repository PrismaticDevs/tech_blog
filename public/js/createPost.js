let $post_title = document.querySelector('#post_title')
let $post_body = document.querySelector('#editor')
let $post_submit = document.querySelector('#submit_post');

async function createPost(e) {
    e.preventDefault();
    try {
        const response = await fetch("/posts/create", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                title: $post_title.value,
                body: $post_body.children[0].innerHTML,
            })
        });
        $post_title.value = '';
        $post_body.value = '';
        location.href = "/posts";
    } catch (error) {
        console.log(error);
    }
}

$post_submit.addEventListener('click', createPost);
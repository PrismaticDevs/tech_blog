let $comment_text = document.querySelector('#comment_text')
let $comment_submit = document.querySelector('#comment_submit');

async function createComment(e) {
    e.preventDefault();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    try {
        const response = await fetch(`/posts/${postId}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                text: $comment_text.value,
                postId: postId,
            })
        });
        $comment_text.value = '';
        location.reload();
    } catch (error) {
        console.log(error);
    }
}
if ($comment_submit) {
    $comment_submit.addEventListener('click', createComment);
}
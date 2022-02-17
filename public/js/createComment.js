let $comment_text = document.querySelector('#comment_text')
let $comment_submit = document.querySelector('#comment_submit');

async function createComment(e) {
    e.preventDefault();
    try {
        const response = await fetch("/comments/create", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                text: $comment_text.value,
            })
        })
        $comment_text.value = '';
    } catch (error) {
        console.log(error);
    }
}
if ($comment_submit) {
    $comment_submit.addEventListener('click', createComment);
}
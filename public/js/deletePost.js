const $error = document.querySelector('#error');
async function deletePost(e) {
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
    } catch (error) {
     $error.textContent = error;
     res.json(error);   
    }
}
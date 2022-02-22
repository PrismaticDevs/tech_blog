const $error = document.querySelector('#error');
const $editPostBtn = document.querySelector('#editPostBtn');
const $post_title = document.querySelector('#post_title');
let $post_body = document.querySelector('#editor');
let $edit_route = document.querySelector('#edit_route');
const $editor = document.querySelector('#editor');
const $editPost = document.querySelector('#editPost');
const $currentPost = document.querySelector('#currentPost');
const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
async function editPost(e) {
    e.preventDefault();
    try {
        if (confirm('Are you sure that you want to edit this post?') == true) {
            const response = await fetch(`/myposts/${id}/edit`, {
                method: "put",
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
            location.href = `/myposts/${id}`;
        }
    } catch (error) {
        $error.textContent = error;
        console.log(error);
    }
}
if ($editPostBtn) {
    $editPostBtn.addEventListener('click', editPost);
}

if ($edit_route) {
    $edit_route.addEventListener('click', (e) => {
        $editPost.style.display = 'block';
        $currentPost.style.display = 'none';
        console.log('hi');
    });
}
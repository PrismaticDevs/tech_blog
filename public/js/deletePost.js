const $deleteBtn = document.querySelector('#delete_post');
async function deletePost(e) {
    e.preventDefault();
    try {
        if (confirm('Are you sure that you want to delete this post?') == true) {
            const id = window.location.toString().split('/')[
                window.location.toString().split('/').length - 1
            ];
            const response = await fetch(`/myposts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            location.href = "/myposts";
        }
    } catch (error) {
        console.log(error);
    }
}
if ($deleteBtn) {
    $deleteBtn.addEventListener('click', deletePost);
}
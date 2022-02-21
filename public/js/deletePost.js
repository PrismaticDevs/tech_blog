const $error = document.querySelector('#error');
const $deleteBtn = document.querySelector('#delete_post');
async function deletePost(e) {
    e.preventDefault();
    try {
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
        location.href = "/myposts"
    } catch (error) {
        $error.textContent = error;
        console.log(error);
    }
}
$deleteBtn.addEventListener('click', deletePost);
let $register_email = document.getElementById('register_email').value;
let $register_password = document.getElementById('register_password').value;
let $register_username = document.getElementById('register_username').value;
const $register_submit = document.getElementById('register_submit');

async function register() {
    await fetch("/register", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                username: $register_username,
                email: $register_email,
                password: $register_password
            })
        })
        .then((response) => {
            console.log(response);
        });
}

$register_submit.addEventListener('click', register);
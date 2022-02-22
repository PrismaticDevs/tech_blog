let $register_email = document.getElementById('register_email');
let $register_password = document.getElementById('register_password');
let $register_username = document.getElementById('register_username');
const $register_submit = document.getElementById('register_submit');
let $signUpMessage = document.querySelector('#signUpMessage');

async function register(e) {
    e.preventDefault();
    try {
        const response = await fetch("/users/register", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                username: $register_username.value,
                email: $register_email.value,
                password: $register_password.value
            })
        });
        const data = await response.json();
        $signUpMessage.textContent = data;
        if (data === "You must provide a valid email and password" || "A user already exists with that email") {
            return;
        }
        $register_username = '';
        $register_email = '';
        $register_password = '';
        location.href = '/posts';
    } catch (error) {
        console.log(error);
    }
}

$register_submit.addEventListener('click', register);
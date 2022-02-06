const $login_email = document.getElementById('login_email').value
const $login_password = document.getElementById('login_password').value
const $login_submit = document.getElementById('login_submit');

async function login() {
    await fetch("/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                email: $login_email,
                password: $login_password
            })
        })
        .then((response) => {
            console.log(response);
        });
}

$login_submit.addEventListener('click', login);
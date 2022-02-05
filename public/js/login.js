const email = document.getElementById('email').value
const password = document.getElementById('password').value

fetch("http://example.com/api/endpoint/", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((response) => {
        //do something awesome that makes the world a better place
    });
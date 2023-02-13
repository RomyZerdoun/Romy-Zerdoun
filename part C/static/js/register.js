function validateForm() {
    let name = document.forms["registerForm"]["name"].value;
    let email = document.forms["registerForm"]["email"].value;
    let address = document.forms["registerForm"]["address"].value;
    let phone = document.forms["registerForm"]["phone"].value;
    let password = document.forms["registerForm"]["password"].value;
    let confirmPassword = document.forms["registerForm"]["repassword"].value;

    if (!name.length || !email.length || !address.length || !phone.length) {
        alert("Some required fields are missing.");
        return false;
    }

    if (!
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) ||
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(confirmPassword)
    ) {
        alert(
            "Password must contain at least one number,\none uppercase and alowercase letter,one special character and at least 8 characters.\nPassword cannot contain whitespace"
        );
        return false;
    }

    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (!
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    ) {
        alert("Email is not valid.");
        return false;
    }

    return true;
}

function register(event) {
    event.preventDefault();
    if (!validateForm()) return;

    let name = document.forms["registerForm"]["name"].value;
    let email = document.forms["registerForm"]["email"].value;
    let address = document.forms["registerForm"]["address"].value;
    let phone = document.forms["registerForm"]["phone"].value;
    let password = document.forms["registerForm"]["password"].value;

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, email, address, phone, password
        }),
    })
        .then(res => res.json())
        .then((res) => {
            if (res?.data) {
                window.location = 'login.html';
            }
            else if (res?.error) {
                console.log(res);
                alert(res.error);
            }
        })
        .catch((ex) => console.log(ex));
}
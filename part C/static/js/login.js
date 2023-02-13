//-------show-password-------------
const togglePassword = document.querySelector('#showPassword');
const password = document.querySelector('#password');

if (togglePassword && password) {
  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
  });
}

function login(event) {
  event.preventDefault();

  let user = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
  };

  fetch("/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  })
      .then((response) => response.json())
      .then((res) => {
          if (res.response) {
              sessionStorage.setItem('LOGGED_IN_USER_EMAIL', res.response.email);
              window.location = 'index.html';
          }
          else if (res.error) {
              console.log(res);
              alert(res.error);
          }
      })
      .catch((ex) => alert(ex));
}
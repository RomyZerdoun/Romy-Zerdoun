const navbar = document.querySelector('.navbar');
if (navbar) {
    let html = `<ul>
    <li><a class="act" href="index.html">home</a></li>
    <li><a class="act" href="products.html">products</a></li>
    <li ><a href="#">about us</a>
        <ul>
            <li><a class="act" href="about.html">about us</a></li>
            <li><a class="act" href="seller.html">sellers</a></li>
        </ul>
    </li>
    <li><a class="act" href="contact.html">contact</a></li>`;

    if (sessionStorage.getItem('LOGGED_IN_USER_EMAIL')) {
        html += `<li><a href="#">account</a>
                <ul>
                    <li><span class="act" onclick="logout()">logout</span></li>
                </ul>
            </li>
        </ul>`;
    }
    else {
        html += `<li><a href="#">account</a>
                <ul>
                    <li><a class="act" href="login.html">login</a></li>
                    <li><a class="act" href="register.html">register</a></li>
                </ul>
            </li>
        </ul>`;
    }

    navbar.innerHTML = html;
}

function logout() {
    sessionStorage.clear();
    window.location = "login.html";
}
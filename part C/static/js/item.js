const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let item;
fetch(`/items/${params.id}`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response) {
            item = response.data[0];
            drawItem();
            loadCart();
        } else {
            alert("item not found");
        }
    })
    .catch((e) => {
        console.log(e);
        alert("A server error occurred");
    });

function drawItem() {
    document.querySelectorAll('.item-name').forEach(i => i.innerText = item.item_name);
    document.querySelector('.product-image > img').src = item.image_id;
    
    let html = ``;
    for (let i=0; i<item.rating; i++) {
        html += `<span><i class="fas fa-star"></i></span>`;
    }
    document.querySelector('.product-rating').innerHTML = `
        ${html} <span class="review">(${item.review} Reviews)</span>
    `;
    document.querySelector('.offer-price').innerText = `$${item.price}.00`;
    document.querySelector('.product-details').innerHTML = `
        <h4>Description</h4>
        <p>${item.description}</p>
    `;
}

function addToCart(id) {
    if (sessionStorage.getItem("LOGGED_IN_USER_EMAIL")) {
        let cartItems = [];
        if (sessionStorage.getItem("CART")) {
            cartItems = JSON.parse(sessionStorage.getItem("CART"));
        }
        cartItems.push(id);
        sessionStorage.setItem("CART", JSON.stringify(cartItems));
    }
    loadCart();
}

function loadCart() {
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        if (
            sessionStorage.getItem("CART") &&
            sessionStorage.getItem("LOGGED_IN_USER_EMAIL")
        ) {
            cartItems = JSON.parse(sessionStorage.getItem("CART"));
            if (cartItems.find(i => i === params.id)) {
                addBtn.innerText = 'This item is in your cart';
                addBtn.classList.add('disabled');
            }
        }

        if (!sessionStorage.getItem("LOGGED_IN_USER_EMAIL")) {
            addBtn.innerText = 'Please login';
            addBtn.addEventListener('click', function(e){
                e.preventDefault();
                window.location = 'login.html';
            });
        }
        else if (!addBtn.classList.contains('disabled')) {
            addBtn.addEventListener('click', function(e){
                e.preventDefault();
                addToCart(params.id);
            });
        }
    }
}
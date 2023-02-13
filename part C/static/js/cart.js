let items = [];
fetch(`/items`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response) {
            items = response.data;
            loadCart();
        } else {
            alert("items not found");
        }
    })
    .catch((e) => {
        console.log(e);
        alert("A server error occurred");
    });

function loadCart() {
    let total = 0;
    if (sessionStorage.getItem("CART")) {
        const cartItems = JSON.parse(sessionStorage.getItem("CART"));
        const container = document.querySelector('.box-container');
        const cartTotal = document.querySelector('.cart-total');

        if (container) {
            for (let i = 0; i < cartItems?.length; i++) {
                const item = items.find(it => it.id === +cartItems[i]);
                if (item) {
                    let html = `
                        <div class="box">
                            <i class="fas fa-times" onclick="remove(${item.id})"></i>
                            <img src="${item.image_id}" alt="${item.item_name}">
                            <div class="content">
                                <h3>${item.item_name}</h3>
                                <form>
                                    <span>quantity: </span>
                                    <input type="number" name="" value="1" >
                                </form>
                                <div class="price"> $${item.price}.00 </div>
                            </div>
                        </div>
                    `;
                    container.innerHTML += html;
                    total += item.price;
                }
            }

            cartTotal.innerHTML = `
                <h3>total: <span>$${total}.00</span></h3>
                <div id="paypal-button-container" style="max-width:300px;"></div>
            `;

            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color:  'gold',
                    shape:  'pill',
                    label:  'pay',
                }
            }).render('#paypal-button-container');
        }
    }
}

function remove(id) {
    let cartItems = JSON.parse(sessionStorage.getItem("CART"));
    cartItems = cartItems.filter(it => +it !== +id);
    sessionStorage.setItem('CART', JSON.stringify(cartItems));
    window.location.reload();
}
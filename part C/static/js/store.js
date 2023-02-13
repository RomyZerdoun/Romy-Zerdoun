const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  fetch(`/sellers/${params.seller_id}`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response) {
            const seller = response.data[0];
            document.querySelectorAll('.store-name').forEach(elem => elem.innerText = seller.store_name);
            document.querySelector('.seller-name').innerText = seller.seller_name;

            for (let i=0; i<seller.rating; i++) {
                document.querySelector('.stars').innerHTML += `<i class="fas fa-star"></i>`;
            }
        } else {
            alert("No seller found");
        }
    })
    .catch((e) => {
        console.log(e);
        alert("A server error occurred");
    });

let products = [];
fetch(`/storeData/${params.seller_id}`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response) {
            products = response.data;
            drawProducts();
        } else {
            alert("No products found");
        }
    })
    .catch((e) => {
        console.log(e);
        alert("A server error occurred");
    });

function drawProducts() {
    const container = document.querySelector('.box-container');
    if (container) {
        for (let i = 0; i < products?.length; i++) {
            const product = products[i];
            let html = `
            <div class="box">
                <img src="${product.image_id}" alt="${product.item_name}">
                <div class="content">
                    <h3>${product.item_name}</h3>
                    <form>
                        <span>quantity:</span>
                        <input type="number" value="${product.quantity_left}">
                    </form>
                    <div class="price"> $${product.price} </div>
                </div>
            </div>
            `;

            container.innerHTML += html;
        }
    }
}
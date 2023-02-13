let products = [];
fetch(`/readItemsTable`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response) {
            products = response;
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
    const container = document.querySelector('.products > .box-container');
    if (container) {
        for (let i = 0; i < products?.length; i++) {
            const product = products[i];
            let html = `
            <div class="box" data-item="${product.exclusive}" id="box-${product.id}">
                <div class="icons">
                    <a href="store.html?seller_id=${product.seller_id}" class="fas fa-store"></a>
                    <a href="item.html?id=${product.id}" class="fas fa-eye"></a>
                </div>
                <div class="image">
                    <img src="${product.image_id}" alt="${product.item_name}">
                </div>
                <div class="content">
                    <h3>${product.item_name}</h3>
                    <div class="price">
                        <div class="amount">$${product.price}</div>
                    </div>
                    <div class="stars">
                    `;
    
                for (let i=0; i<product.rating; i++) {
                    html +=`<i class="fas fa-star"></i>`;
                }
    
                html +=`
                    </div>
                </div>
            </div>
            `;
    
            container.innerHTML += html;
        }
    }

    //------filter- product and home page-----
let filterBtn = document.querySelectorAll('.filter-buttons .buttons');
let filterItem = document.querySelectorAll('.products .box-container .box');

filterBtn.forEach(button =>{

  button.onclick = () =>{
    filterBtn.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    let dataFilter = button.getAttribute('data-filter');

    filterItem.forEach(item =>{
      item.classList.remove('active');
      item.classList.add('hide');

      if(item.getAttribute('data-item') == dataFilter || dataFilter == 'all'){
        item.classList.remove('hide');
        item.classList.add('active');
      }
    });
  };
});
}
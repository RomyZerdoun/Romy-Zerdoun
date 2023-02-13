let sellers = [];
fetch(`/sellers`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response) {
            sellers = response.data;
            drawSellers();
        } else {
            alert("No sellers found");
        }
    })
    .catch((e) => {
        console.log(e);
        alert("A server error occurred");
    });

function drawSellers() {
    const container = document.querySelector('.box-container');
    if (container) {
        for (let i = 0; i < sellers?.length; i++) {
            const seller = sellers[i];
            let html = `
                <div class="box">
                <div class="image">
                    <img src="${seller.image_id}" alt="${seller.seller_name}">
                </div>
                <div class="content">
                    <h3>${seller.store_name}</h3>
                    <h3>${seller.seller_name}</h3>
                    <div class="stars">
                    `;

                    for (let i=0; i<seller.rating; i++) {
                        html +=`<i class="fas fa-star"></i>`;
                    }

                    html +=`
                    </div>
                    <p> description: ${seller.description}</p>
                    <a href="store.html?seller_id=${seller.id}" class="buttons-simple">my store</a>
                </div>
            </div>
            `;
    
            container.innerHTML += html;
        }
    }
}
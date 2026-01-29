const card = document.getElementById('card');

fetch("https://dummyjson.com/products")
    .then((data) => data.json())
    .then((res) => {
        res.products.forEach(product => {
            const div = document.createElement('div');
            div.className = "product";

            div.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₹ ${product.price}</p>
                <p>Rating: ${product.rating}</p>
            `;

            card.appendChild(div);
        });
    })
    .catch((err) => console.log(err));

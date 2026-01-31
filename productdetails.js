const container = document.getElementById("productDetails");

// Get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// safety check
if (!productId) {
    container.innerHTML = "<h2>Invalid product</h2>";
    throw new Error("Product ID missing");
}

fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
        container.innerHTML = `
            <img 
                src="${product.images[0]}" 
                alt="${product.title}"
                onerror="this.src='https://via.placeholder.com/500x300?text=No+Image'"
            >
            <h2>${product.title}</h2>
            <p><strong>Price:</strong> ₹ ${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <p><strong>Description:</strong> ${product.description}</p>
        `;

        saveProductDetailsHistory(product);
    })
    .catch(err => {
        console.error(err);
        container.innerHTML = "<h2>Failed to load product</h2>";
    });

// ---------- SAVE PRODUCT DETAILS HISTORY ----------
function saveProductDetailsHistory(product) {
    let history =
        JSON.parse(localStorage.getItem("productDetailsHistory")) || [];

    if (!history.some(item => item.id === product.id)) {
        history.push({
            id: product.id,
            title: product.title,
            time: Date.now()
        });
    }

    history.sort((a, b) => b.time - a.time);

    localStorage.setItem(
        "productDetailsHistory",
        JSON.stringify(history)
    );
}

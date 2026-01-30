const container = document.getElementById("productDetails");

// Get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
        // Render UI
        container.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p><strong>Price:</strong> ₹ ${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <p><strong>Description:</strong> ${product.description}</p>
        `;

        // 🔥 SAVE PRODUCT DETAILS HISTORY
        saveProductDetailsHistory(product);
    })
    .catch(err => console.error(err));


// ---------- SAVE PRODUCT DETAILS HISTORY ----------
function saveProductDetailsHistory(product) {
    let history =
        JSON.parse(localStorage.getItem("productDetailsHistory")) || [];
    console.log(history);

    // avoid duplicates
    if (!history.some(item => item.id === product.id)) {
        history.push({
            id: product.id,
            title: product.title,
            time: Date.now()
        });
    }

    // ✅ SORT BY LATEST TIME (IMPORTANT PART)
    history.sort((a, b) => b.time - a.time);

    localStorage.setItem(
        "productDetailsHistory",
        JSON.stringify(history)
    );
}

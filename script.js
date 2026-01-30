const card = document.getElementById('card');
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const suggestion = document.getElementById('suggestions');

let allProducts = [];

// Render products
function renderProducts(products) {
    card.innerHTML = '';

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';

        div.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₹ ${product.price}</p>
        `;

        // 👉 OPEN PRODUCT DETAILS
        div.addEventListener("click", () => {
            window.location.href = `productdetails.html?id=${product.id}`;
        });

        card.appendChild(div);
    });
}

// Initial fetch
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        allProducts = data.products;
        renderProducts(allProducts);
    })
    .catch(err => console.error(err));

// Search button click
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    renderProducts(filtered);

    // Save suggestion (UNCHANGED)
    let suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    if (!suggestions.some(s => s.query === query)) {
        suggestions.push({ query: query, time: Date.now() });
        localStorage.setItem('suggestions', JSON.stringify(suggestions));
    }
});

// INPUT EVENT (ALL console.logs kept)
searchInput.addEventListener('input', () => {
    console.log("suggestion working");

    const text = searchInput.value.toLowerCase();

    const history = JSON.parse(localStorage.getItem("suggestions")) || [];
    console.log(history);

    const matches = history.filter(item =>
        item.query.toLowerCase().includes(text)
    );
    console.log(matches);

    suggestion.innerHTML = "";

    matches.forEach(item => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerText = item.query;

        div.addEventListener("click", () => {
            searchInput.value = item.query;
            suggestion.innerHTML = "";

            const filtered = allProducts.filter(product =>
                product.title.toLowerCase().includes(item.query.toLowerCase())
            );
            renderProducts(filtered);
        });

        suggestion.appendChild(div);
    });
});

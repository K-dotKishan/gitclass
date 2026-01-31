const card = document.getElementById('card');
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const suggestion = document.getElementById('suggestions');

let allProducts = [];
let currentProducts = []; // products after search
let currentPage = 1;
const itemsPerPage = 6;

/* ---------------- PAGINATION UI (CREATED VIA JS) ---------------- */
const paginationBox = document.createElement("div");
paginationBox.style.marginTop = "20px";

const prevBtn = document.createElement("button");
prevBtn.innerText = "Prev";

const pageInfo = document.createElement("span");
pageInfo.style.margin = "0 10px";

const nextBtn = document.createElement("button");
nextBtn.innerText = "Next";

paginationBox.appendChild(prevBtn);
paginationBox.appendChild(pageInfo);
paginationBox.appendChild(nextBtn);

card.after(paginationBox);
/* --------------------------------------------------------------- */

// Render products WITH pagination
function renderProducts(products) {
    currentProducts = products;
    card.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);

    pageItems.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';

        div.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₹ ${product.price}</p>
        `;

        // OPEN PRODUCT DETAILS
        div.addEventListener("click", () => {
            window.location.href = `productdetails.html?id=${product.id}`;
        });

        card.appendChild(div);
    });

    const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Initial fetch
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        allProducts = data.products;
        currentPage = 1;
        renderProducts(allProducts);
    })
    .catch(err => console.error(err));

// Search button click
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    currentPage = 1;
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

            currentPage = 1;
            renderProducts(filtered);
        });

        suggestion.appendChild(div);
    });
});

// Pagination buttons
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts(currentProducts);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts(currentProducts);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

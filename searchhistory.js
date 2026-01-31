const historyBox = document.getElementById("history");
const clearBtn = document.getElementById("clearHistory");

// Get history
const history = JSON.parse(localStorage.getItem("suggestions")) || [];

// Sort latest first
history.sort((a, b) => b.time - a.time);

// Render history
if (history.length === 0) {
    historyBox.innerHTML = "<p>No search history found.</p>";
} else {
    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerText = item.query;

        // ✅ REDIRECT TO PRODUCT LIST WITH SEARCH
        div.addEventListener("click", () => {
            window.location.href =
                `index.html?search=${encodeURIComponent(item.query)}`;
        });

        historyBox.appendChild(div);
    });
}

// Clear history
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("suggestions");
    historyBox.innerHTML = "<p>History cleared.</p>";
});

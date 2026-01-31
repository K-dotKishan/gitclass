const historyBox = document.getElementById("history");
const clearBtn = document.getElementById("clearHistory");

// Get history from localStorage
const history = JSON.parse(localStorage.getItem("suggestions")) || [];

// Sort by latest first
history.sort((a, b) => b.time - a.time);

// Render history
if (history.length === 0) {
    historyBox.innerHTML = "<p>No search history found.</p>";
} else {
    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerText = item.query;

        // ✅ IMPORTANT: relative path (NO leading slash)
        div.addEventListener("click", () => {
            window.location.href = `productdetails.html?id=${item.id}`;
        });

        historyBox.appendChild(div);
    });
}

// Clear history
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("suggestions");
    historyBox.innerHTML = "<p>History cleared.</p>";
});

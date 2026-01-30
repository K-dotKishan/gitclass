const historyBox = document.getElementById("history");
const clearBtn = document.getElementById("clearHistory");


const history = JSON.parse(localStorage.getItem("suggestions")) || [];

history.sort((a,b) => b.time - a.time)

if (history.length === 0) {
    historyBox.innerHTML = "<p>No search history found.</p>";
} else {
    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerText = item.query;
        historyBox.appendChild(div);
    });
}

// Clear history
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("suggestions");
    historyBox.innerHTML = "<p>History cleared.</p>";
});

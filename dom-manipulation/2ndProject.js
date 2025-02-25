// Load quotes from Local Storage or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do what you can, with what you have, where you are.", category: "Success" }
];

// Function to save quotes in Local Storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").innerText = "No quotes available!";
        return;
    }

    let randomIndex = Math.floor(Math.random() * quotes.length);
    let quoteObj = quotes[randomIndex];

    let quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${quoteObj.text}" - <strong>${quoteObj.category}</strong></p>`;
}

// Function to add a new quote
function addQuote() {
    let newText = document.getElementById("newQuoteText").value.trim();
    let newCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newText === "" || newCategory === "") {
        alert("Please enter both a quote and a category!");
        return;
    }

    let newQuoteObj = { text: newText, category: newCategory };
    quotes.push(newQuoteObj);
    saveQuotes(); // Save to local storage
    displayAllQuotes(); // Refresh list

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
}

// Function to display all quotes
function displayAllQuotes() {
    let quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = "";

    quotes.forEach((quote, index) => {
        let quoteItem = document.createElement("li");
        quoteItem.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong> <button onclick="removeQuote(${index})">❌</button>`;
        quoteList.appendChild(quoteItem);
    });
}

// Function to remove a quote
function removeQuote(index) {
    quotes.splice(index, 1);
    saveQuotes();
    displayAllQuotes();
}

// Function to export quotes as JSON
function exportToJsonFile() {
    let dataStr = JSON.stringify(quotes, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            let importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                displayAllQuotes();
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid JSON format.");
            }
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Load quotes when page loads
document.addEventListener("DOMContentLoaded", () => {
    displayAllQuotes();
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    document.getElementById("addQuoteButton").addEventListener("click", addQuote);
    document.getElementById("exportButton").addEventListener("click", exportToJsonFile);
});

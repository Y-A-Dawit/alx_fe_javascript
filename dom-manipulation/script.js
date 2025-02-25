const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

// Load quotes from Local Storage or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do what you can, with what you have, where you are.", category: "Success" }
];

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Fetch quotes from the server (simulated API)
async function fetchQuotesFromServer() {
    try {
        let response = await fetch(API_URL);
        let serverQuotes = await response.json();

        let formattedQuotes = serverQuotes.slice(0, 5).map(q => ({
            text: q.title, category: "Server Synced"
        }));

        handleConflictResolution(formattedQuotes);
    } catch (error) {
        console.error("Error fetching server quotes:", error);
    }
}

// Handle conflicts by merging quotes (server takes priority)
function handleConflictResolution(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    
    let mergedQuotes = [...serverQuotes, ...localQuotes.filter(q => !serverQuotes.some(sq => sq.text === q.text))];

    localStorage.setItem("quotes", JSON.stringify(mergedQuotes));
    quotes = mergedQuotes;
    
    populateCategories();
    filterQuotes();
    
    alert("Quotes have been updated from the server!");
}

// Push local quotes to the server (mocked API request)
async function syncQuotesToServer() {
    try {
        for (let quote of quotes) {
            await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(quote),
                headers: { "Content-Type": "application/json" }
            });
        }
        alert("Local quotes synced to the server!");
    } catch (error) {
        console.error("Error syncing to server:", error);
    }
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").textContent = "No quotes available.";
        return;
    }
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Function to populate the category dropdown dynamically
function populateCategories() {
    let categoryDropdown = document.getElementById("categoryFilter");
    categoryDropdown.innerHTML = '<option value="all">All Categories</option>';
    let categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
    let lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";
    categoryDropdown.value = lastSelectedCategory;
    filterQuotes();
}

// Function to filter quotes by category
function filterQuotes() {
    let selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);
    let filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
    displayQuotes(filteredQuotes);
}

// Function to display quotes in the list
function displayQuotes(filteredList) {
    let quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = "";
    filteredList.forEach((quote, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong> 
                              <button onclick="removeQuote(${index})">❌</button>`;
        quoteList.appendChild(listItem);
    });
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
    saveQuotes();
    
    populateCategories();
    filterQuotes();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
}

// Function to remove a quote
function removeQuote(index) {
    quotes.splice(index, 1);
    saveQuotes();
    populateCategories();
    filterQuotes();
}

// Auto-sync every 60 seconds
setInterval(fetchQuotesFromServer, 60000);

// Load quotes on page start
document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    showRandomQuote();
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    document.getElementById("addQuoteButton").addEventListener("click", addQuote);
    document.getElementById("syncServerButton").addEventListener("click", syncQuotesToServer);
});

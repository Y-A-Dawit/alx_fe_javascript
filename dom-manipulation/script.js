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
    categoryDropdown.innerHTML = '<option value="all">All Categories</option>'; // Default option

    let categories = [...new Set(quotes.map(q => q.category))]; // Extract unique categories
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    // Restore last selected category from local storage
    let lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";
    categoryDropdown.value = lastSelectedCategory;
    filterQuotes(); // Apply filter immediately
}

// Function to display quotes based on selected category
function filterQuotes() {
    let selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save filter preference

    let filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    displayQuotes(filteredQuotes);
}

// Function to display quotes in the list
function displayQuotes(filteredList) {
    let quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = ""; // Clear current list

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
    
    populateCategories(); // Update categories dynamically
    filterQuotes(); // Refresh displayed quotes

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
}

// Function to remove a quote
function removeQuote(index) {
    quotes.splice(index, 1);
    saveQuotes();
    populateCategories(); // Update categories in case it was the last quote in one
    filterQuotes();
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
                populateCategories();
                filterQuotes();
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

// Load quotes and categories when page loads
document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    showRandomQuote();
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    document.getElementById("addQuoteButton").addEventListener("click", addQuote);
    document.getElementById("exportButton").addEventListener("click", exportToJsonFile);
});

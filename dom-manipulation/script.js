// Sample quotes array with categories
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do what you can, with what you have, where you are.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").innerHTML = "No quotes available!";
        return;
    }
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteDisplay").innerHTML = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
}

// Function to add a new quote
function createAddQuoteForm() {
    let newText = document.getElementById("newQuoteText").value.trim();
    let newCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newText === "" || newCategory === "") {
        alert("Please enter both a quote and a category!");
        return;
    }

    // Add new quote to the array
    quotes.push({ text: newText, category: newCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);

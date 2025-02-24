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
    let quoteObj = quotes[randomIndex];

    // Create a new div for the quote
    let quoteContainer = document.createElement("div");
    quoteContainer.classList.add("quote-container");

    let quoteText = document.createElement("p");
    quoteText.innerHTML = `"${quoteObj.text}"`;

    let quoteCategory = document.createElement("span");
    quoteCategory.innerHTML = ` - ${quoteObj.category}`;
    quoteCategory.style.fontWeight = "bold";

    // Clear existing content and add the new elements
    let quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear previous content
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(quoteCategory);
    quoteDisplay.appendChild(quoteContainer);
}

// Function to add a new quote
function createAddQuoteForm() {
    let newText = document.getElementById("newQuoteText").value.trim();
    let newCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newText === "" || newCategory === "") {
        alert("Please enter both a quote and a category!");
        return;
    }

    // Create a new quote object and add to array
    let newQuoteObj = { text: newText, category: newCategory };
    quotes.push(newQuoteObj);

    // Create a new list item for the added quote
    let quoteItem = document.createElement("li");
    quoteItem.innerHTML = `"${newText}" - <strong>${newCategory}</strong>`;

    // Append the new quote to the display
    document.getElementById("quoteList").appendChild(quoteItem);

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);

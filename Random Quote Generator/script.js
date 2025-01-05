// script.js
const quoteBox = document.getElementById("quote-box");
const textElement = document.getElementById("text");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetQuoteLink = document.getElementById("tweet-quote");

// Function to fetch a random quote
async function fetchQuote() {
  try {
    const response = await fetch("https://go-quote.azurewebsites.net/api/quote");
    const data = await response.json();
    console.log(data);
    
    
    // Update the quote and author
    textElement.textContent = `"${data.text}"`;
    authorElement.textContent = `- ${data.author}`;
    
    // Update the tweet link
    tweetQuoteLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${data.text}" - ${data.author}`)}`;
  } catch (error) {
    textElement.textContent = "An error occurred. Please try again.";
    authorElement.textContent = "";
  }
}

// Fetch a new quote when the button is clicked
newQuoteButton.addEventListener("click", fetchQuote);

// Fetch a quote on initial load
fetchQuote();

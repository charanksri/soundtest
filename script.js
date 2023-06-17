// Fetch autocomplete suggestions from Spotify API
async function fetchAutocompleteSuggestions(query) {
  // Code for fetching autocomplete suggestions from Spotify API...
}

// Get the correct answer from Spotify API track name
async function getCorrectAnswer() {
  // Code for getting the correct answer from Spotify API...
}

// Handle user input and autocomplete functionality
const userInput = document.getElementById("sound-name-input");
const autocompleteDropdown = document.getElementById("autocomplete-dropdown");
let correctAnswer = "";
let triesLeft = 5;

// Get the correct answer from the Spotify API
getCorrectAnswer().then((answer) => {
  correctAnswer = answer;
});

userInput.addEventListener("input", async (event) => {
  const query = event.target.value.trim();
  if (query.length === 0) {
    autocompleteDropdown.innerHTML = ""; // Clear dropdown when input is empty
    return;
  }

  const suggestions = await fetchAutocompleteSuggestions(query);
  autocompleteDropdown.innerHTML = ""; // Clear previous suggestions

  // Display suggestions in the dropdown
  suggestions.forEach((suggestion) => {
    const option = document.createElement("option");
    option.value = suggestion;
    autocompleteDropdown.appendChild(option);
  });
});

// Handle user selection
userInput.addEventListener("change", (event) => {
  const selectedValue = event.target.value.trim();

  if (selectedValue.toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById("answer-text").textContent =
      "You got it! The answer was the song name.";
    document
      .querySelector(".try-square:nth-child(" + triesLeft + ")")
      .classList.add("correct");
  } else {
    document.getElementById("answer-text").textContent =
      "Sorry, that's not the correct answer.";
    document
      .querySelector(".try-square:nth-child(" + triesLeft + ")")
      .classList.add("wrong");
  }

  triesLeft--;

  if (triesLeft === 0) {
    userInput.disabled = true;
    document.getElementById("submit-button").disabled = true;
    document.getElementById("answer-text").textContent =
      "Game Over. You've used all your tries.";
  }

  userInput.value = "";
});

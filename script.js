// Fetch autocomplete suggestions from Spotify API
async function fetchAutocompleteSuggestions(query) {
  // Code for fetching autocomplete suggestions from Spotify API...
}

// Get the correct answer from Spotify API track name
async function getCorrectAnswer() {
  // Code for getting the correct answer from Spotify API...
}

// Handle instructions popup
const instructionsButton = document.getElementById("instructions-button");
const instructionsPopup = document.getElementById("instructions-popup");
const popupCloseButton = document.getElementById("popup-close-button");
const instructionOverlay = document.getElementById("instruction-overlay");

instructionsButton.addEventListener("click", () => {
  instructionsPopup.style.display = "block";
  instructionOverlay.style.display = "block";
});

popupCloseButton.addEventListener("click", () => {
  instructionsPopup.style.display = "none";
  instructionOverlay.style.display = "none";
});

instructionOverlay.addEventListener("click", () => {
  instructionsPopup.style.display = "none";
  instructionOverlay.style.display = "none";
});

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

userInput.addEventListener("change", (event) => {
  const selectedValue = event.target.value.trim();

  if (selectedValue.toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById("answer-text").textContent =
      "You got it! The answer was the song name.";
    document
      .querySelector(".try-square:nth-child(" + triesLeft + ")")
      .classList.add("correct");
    userInput.disabled = true;
    document.getElementById("submit-button").disabled = true;
  } else {
    document.getElementById("answer-text").textContent = "Sorry, try again.";
    document
      .querySelector(".try-square:nth-child(" + triesLeft + ")")
      .classList.add("wrong");
  }

  triesLeft--;
  if (triesLeft === 0) {
    userInput.disabled = true;
    document.getElementById("submit-button").disabled = true;
  }
});

// Styling for the answer message
const answerText = document.getElementById("answer-text");
answerText.style.color = "white";

// Styling for the tries squares
const triesSquares = document.querySelectorAll(".try-square");
triesSquares.forEach((square) => {
  square.style.backgroundColor = "lightgrey";
  square.style.borderRadius = "5px";
});

// Styling for the SoundCloud player
const soundCloudPlayer = document.querySelector("iframe");
soundCloudPlayer.style.marginBottom = "20px";

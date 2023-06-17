// Instructions popup functionality
const instructionsButton = document.getElementById("instructions-button");
const instructionsPopup = document.getElementById("instructions-popup");
const instructionOverlay = document.getElementById("instruction-overlay");
const popupCloseButton = document.getElementById("popup-close-button");

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

// SoundCloud player initialization
// Replace 'YOUR_SOUND_CLOUD_TRACK_URL' with the actual SoundCloud track URL
const soundCloudPlayer = document.querySelector("iframe");
const soundCloudURL = "YOUR_SOUND_CLOUD_TRACK_URL";
soundCloudPlayer.src = `https://w.soundcloud.com/player/?url=${soundCloudURL}`;

// Track name submission functionality
const userInput = document.getElementById("sound-name-input");
const submitButton = document.getElementById("submit-button");
const answerText = document.getElementById("answer-text");
const triesSquares = document.querySelectorAll(".try-square");
const maxTries = triesSquares.length;
let triesLeft = maxTries;

submitButton.addEventListener("click", () => {
  const userAnswer = userInput.value.toLowerCase();
  const correctAnswer = "your_correct_answer";

  if (userAnswer === correctAnswer) {
    answerText.textContent = "You got it - The answer was the song name";
    triesSquares[maxTries - triesLeft].classList.add("correct");
    userInput.disabled = true;
    submitButton.disabled = true;

    // Calculate time
    const startTime = soundCloudPlayer.contentWindow.SC.Widget.Events.PLAY;
    const endTime = new Date().getTime();
    const timeDiff = Math.abs(endTime - startTime);
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const timerText = document.getElementById("timer");
    timerText.textContent = `Time taken: ${seconds} seconds`;
  } else {
    answerText.textContent = "Wrong answer. Try again.";
    triesSquares[maxTries - triesLeft].classList.add("wrong");
    triesLeft--;

    if (triesLeft === 0) {
      userInput.disabled = true;
      submitButton.disabled = true;
      answerText.textContent = "Out of tries. The answer was the song name.";
    }
  }

  userInput.value = "";
});

// Autocomplete functionality using Spotify API
const autocompleteDropdown = document.getElementById("autocomplete-dropdown");
userInput.addEventListener("input", () => {
  const query = userInput.value.toLowerCase();
  autocompleteDropdown.innerHTML = "";

  // Make API call to Spotify API for autocomplete suggestions
  // Replace 'YOUR_SPOTIFY_API_ENDPOINT' with the actual Spotify API endpoint
  fetch(`YOUR_SPOTIFY_API_ENDPOINT?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      const tracks = data.tracks.items;

      tracks.forEach((track) => {
        const option = document.createElement("option");
        option.value = track.name;
        autocompleteDropdown.appendChild(option);
      });
    });
});

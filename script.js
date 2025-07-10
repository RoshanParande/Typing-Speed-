const textDisplay = document.getElementById("textDisplay");
const inputBox = document.getElementById("inputBox");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Coding is fun when you practice every day.",
  "JavaScript adds magic to your web projects.",
  "Learning HTML, CSS, and JS is a great start.",
  "A developer solves problems using logic and design.",
  "Typing faster helps in programming and communication.",
  "Web development combines creativity and code.",
  "Responsive design makes your website mobile-friendly."
];

let timer = 0;
let interval = null;
let started = false;

function setRandomSentence() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  textDisplay.textContent = sentences[randomIndex];
}

inputBox.addEventListener("input", () => {
  if (!started) {
    started = true;
    interval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
      calculateStats();
    }, 1000);
  }

  const input = inputBox.value;
  const target = textDisplay.textContent;

  if (input.length >= target.length || input.endsWith(".")) {
    clearInterval(interval);
    calculateStats(true);
  } else {
    calculateStats();
  }
});

function calculateStats(end = false) {
  const input = inputBox.value.trim();
  const target = textDisplay.textContent.trim();

  const words = input.split(" ").filter(Boolean).length;
  const wpm = timer > 0 ? Math.round((words / timer) * 60) : 0;
  const correctChars = [...input].filter((ch, i) => ch === target[i]).length;
  const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
}

function resetTest() {
  clearInterval(interval);
  timer = 0;
  started = false;
  inputBox.value = "";
  timerDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100";
  setRandomSentence(); // <-- Get new random sentence
}

// Set initial sentence
setRandomSentence();

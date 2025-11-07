const words = ["developer", "pipeline", "integration", "scramble", "version", "deploy", "action", "commit", "github", "frontend"];
let currentWord = "";
let scrambled = "";
let score = 0;

const scrambledWordElem = document.getElementById("scrambledWord");
const guessInput = document.getElementById("guess");
const resultElem = document.getElementById("result");
const scoreElem = document.getElementById("scoreValue");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

function shuffle(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

function newWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambled = shuffle(currentWord);
  scrambledWordElem.textContent = scrambled;
  guessInput.value = "";
  resultElem.textContent = "";
}

submitBtn.addEventListener("click", () => {
  const guess = guessInput.value.trim().toLowerCase();
  if (guess === currentWord) {
    resultElem.textContent = "Correct!";
    score += 10;
    scoreElem.textContent = score;
  } else {
    resultElem.textContent = "Try again.";
  }
});

nextBtn.addEventListener("click", newWord);

newWord();

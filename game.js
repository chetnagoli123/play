const words = [
  { word: "planet", hint: "A large object orbiting a star" },
  { word: "forest", hint: "A place full of trees" },
  { word: "music", hint: "Something you can hear and enjoy" },
  { word: "rainbow", hint: "Appears in the sky after rain" },
  { word: "ocean", hint: "A vast body of salt water" },
  { word: "coffee", hint: "A popular morning drink" },
  { word: "mirror", hint: "It reflects your image" },
  { word: "candle", hint: "It gives light when lit" },
  { word: "friend", hint: "Someone who cares about you" },
  { word: "dream", hint: "What you see while sleeping" }
];

let currentWord = "";
let scrambled = "";

const scrambledWordEl = document.getElementById("scrambledWord");
const hintEl = document.getElementById("hint");
const inputEl = document.getElementById("userInput");
const messageEl = document.getElementById("message");
const checkBtn = document.getElementById("checkBtn");
const newWordBtn = document.getElementById("newWordBtn");

function shuffleWord(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

function newWord() {
  const randomItem = words[Math.floor(Math.random() * words.length)];
  currentWord = randomItem.word.toLowerCase();
  scrambled = shuffleWord(currentWord);
  scrambledWordEl.textContent = scrambled;
  hintEl.textContent = `Hint: ${randomItem.hint}`;
  inputEl.value = "";
  messageEl.textContent = "";
}

checkBtn.addEventListener("click", () => {
  const userGuess = inputEl.value.trim().toLowerCase();
  if (!userGuess) {
    messageEl.textContent = "Please enter your guess!";
    messageEl.style.color = "#ffdd57";
    return;
  }
  if (userGuess === currentWord) {
    messageEl.textContent = "🎉 Correct! Great job!";
    messageEl.style.color = "#aaffaa";
  } else {
    messageEl.textContent = "❌ Try again!";
    messageEl.style.color = "#ffaaaa";
  }
});

newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

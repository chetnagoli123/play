const words = [
  { word: "bridge", hint: "It connects two sides" },
  { word: "whisper", hint: "Quiet but powerful" },
  { word: "puzzle", hint: "You solve it piece by piece" },
  { word: "shadow", hint: "It follows you everywhere" },
  { word: "feather", hint: "Light as air but can’t fly alone" },
  { word: "island", hint: "Surrounded by water" },
  { word: "mirror", hint: "It shows your reflection" },
  { word: "forest", hint: "Where trees crowd together" },
  { word: "candle", hint: "It burns to give light" },
  { word: "memory", hint: "It fades but never truly disappears" },
  { word: "echo", hint: "It repeats what you say" },
  { word: "galaxy", hint: "A home of countless stars" },
  { word: "horizon", hint: "You see it but can never reach it" },
  { word: "illusion", hint: "It looks real but isn’t" },
  { word: "silence", hint: "Heard by all, spoken by none" },
  { word: "harvest", hint: "It comes after months of waiting" },
  { word: "thunder", hint: "You hear it after the flash" },
  { word: "anchor", hint: "It holds steady beneath the waves" },
  { word: "compass", hint: "Always points you somewhere" },
  { word: "lantern", hint: "A small light in the dark" }
];

let currentWord = "";
let scrambled = "";
let tries = 0;

const scrambledWordEl = document.getElementById("scrambledWord");
const hintEl = document.getElementById("hint");
const inputEl = document.getElementById("userInput");
const messageEl = document.getElementById("message");
const checkBtn = document.getElementById("checkBtn");
const newWordBtn = document.getElementById("newWordBtn");

function shuffleWord(word) {
  // Prevent easy reversals by ensuring a strong scramble
  let shuffled = "";
  do {
    shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
  } while (shuffled === word); 
  return shuffled;
}

function newWord() {
  const randomItem = words[Math.floor(Math.random() * words.length)];
  currentWord = randomItem.word.toLowerCase();
  scrambled = shuffleWord(currentWord);
  scrambledWordEl.textContent = scrambled;
  hintEl.textContent = `Hint: ${randomItem.hint}`;
  inputEl.value = "";
  messageEl.textContent = "";
  tries = 0;
}

checkBtn.addEventListener("click", () => {
  const userGuess = inputEl.value.trim().toLowerCase();
  if (!userGuess) {
    messageEl.textContent = "Please enter your guess!";
    messageEl.style.color = "#ffdd57";
    return;
  }

  if (userGuess === currentWord) {
    messageEl.textContent = "Correct! Well done!";
    messageEl.style.color = "#aaffaa";
  } else {
    tries++;
    messageEl.textContent = "Try again!";
    messageEl.style.color = "#ffaaaa";

    if (tries === 2) {
      const firstTwo = currentWord.slice(0, 2).toUpperCase();
      messageEl.textContent = `Almost there! It begins with '${firstTwo}...'`;
      messageEl.style.color = "#ffdd57";
    } else if (tries === 3) {
      const lastLetter = currentWord.slice(-1).toUpperCase();
      messageEl.textContent = `Another clue: It ends with '${lastLetter}'.`;
      messageEl.style.color = "#ffdd57";
    } else if (tries >= 4) {
      messageEl.textContent = `Hint overload! The word was '${currentWord.toUpperCase()}'. Try a new one!`;
      messageEl.style.color = "#99ccff";
    }
  }
});

newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

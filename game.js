// Word list with subtle, riddle-like hints
const words = [
  // Easy
  { word: "apple", hint: "Something teachers love to get" },
  { word: "river", hint: "It keeps flowing but never walks" },
  { word: "dream", hint: "It comes to you when your eyes are closed" },
  { word: "clock", hint: "It has hands but can’t hold anything" },
  { word: "storm", hint: "Loud, wild, and often followed by calm" },
  { word: "shadow", hint: "Always follows but never speaks" },
  { word: "mirror", hint: "It shows you but isn’t you" },
  { word: "forest", hint: "A place where silence has sound" },
  { word: "music", hint: "Heard but never seen" },
  { word: "light", hint: "You see it when darkness ends" },

  // Medium
  { word: "bridge", hint: "It connects two sides without moving" },
  { word: "whisper", hint: "Quiet but can say everything" },
  { word: "feather", hint: "Light as air but can’t fly alone" },
  { word: "puzzle", hint: "It’s missing something until it’s complete" },
  { word: "time", hint: "It flies but has no wings" },
  { word: "rainbow", hint: "Appears after tears of the sky" },
  { word: "candle", hint: "It burns to give others light" },
  { word: "echo", hint: "It repeats but never starts the talk" },
  { word: "sand", hint: "It slips away even when held tight" },
  { word: "island", hint: "Surrounded but never lonely" },

  // Hard
  { word: "gravity", hint: "Invisible, but it pulls us all together" },
  { word: "silence", hint: "Heard by all, spoken by none" },
  { word: "memory", hint: "It fades but never truly leaves" },
  { word: "illusion", hint: "It fools your eyes but not your mind" },
  { word: "moment", hint: "Fleeting, yet it can change everything" },
  { word: "glacier", hint: "It moves slower than time but carves mountains" },
  { word: "galaxy", hint: "A home of countless lights" },
  { word: "horizon", hint: "You see it but can never reach it" },
  { word: "phantom", hint: "Seen by few, felt by many" },
  { word: "whirlpool", hint: "Spins endlessly, pulling everything inward" }
];

// DOM elements
const scrambledWordEl = document.getElementById("scrambledWord");
const hintEl = document.getElementById("hint");
const inputEl = document.getElementById("userInput");
const messageEl = document.getElementById("message");
const checkBtn = document.getElementById("checkBtn");
const newWordBtn = document.getElementById("newWordBtn");

// Helper: shuffle the letters of a word
function shuffleWord(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

// Helper: randomize hint phrasing for a natural feel
const hintTemplates = [
  hint => `Here's a clue: ${hint}`,
  hint => `Think about this — ${hint}`,
  hint => `A little whisper says: ${hint}`,
  hint => `Maybe this helps: ${hint}`,
  hint => `Clue: ${hint}`,
  hint => `${hint}`
];

function getRandomHint(hint) {
  const style = hintTemplates[Math.floor(Math.random() * hintTemplates.length)];
  return style(hint);
}

// Randomize the order of words for replayability
function shuffleWords() {
  return words.sort(() => Math.random() - 0.5);
}
const shuffledWords = shuffleWords();

let currentWord = "";
let scrambled = "";

// Load a new scrambled word
function newWord() {
  const randomItem = shuffledWords[Math.floor(Math.random() * shuffledWords.length)];
  currentWord = randomItem.word.toLowerCase();
  scrambled = shuffleWord(currentWord);

  scrambledWordEl.textContent = scrambled;
  hintEl.textContent = getRandomHint(randomItem.hint);
  hintEl.classList.remove("visible");
  setTimeout(() => hintEl.classList.add("visible"), 100); // fade-in animation

  inputEl.value = "";
  messageEl.textContent = "";
}

// Handle user's guess
checkBtn.addEventListener("click", () => {
  const userGuess = inputEl.value.trim().toLowerCase();
  if (!userGuess) {
    messageEl.textContent = "Please enter your guess!";
    messageEl.style.color = "#ffdd57";
    return;
  }
  if (userGuess === currentWord) {
    messageEl.textContent = "Correct! Nicely done!";
    messageEl.style.color = "#aaffaa";
  } else {
    messageEl.textContent = "Not quite — try again!";
    messageEl.style.color = "#ffaaaa";
  }
});

// Buttons and initial load
newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

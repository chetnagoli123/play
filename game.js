const words = [
  // === Easy Words ===
  { word: "apple", hint: "A fruit that keeps the doctor away" },
  { word: "river", hint: "Flows from the mountains to the sea" },
  { word: "chair", hint: "You sit on it every day" },
  { word: "cloud", hint: "Floats gently in the sky" },
  { word: "music", hint: "Something you can hear and enjoy" },
  { word: "dream", hint: "What you see while sleeping" },
  { word: "sunset", hint: "When the day says goodbye" },
  { word: "garden", hint: "A place where flowers bloom" },
  { word: "friend", hint: "Someone who cares about you" },
  { word: "mirror", hint: "It shows who you are" },
  { word: "candle", hint: "It glows when lit" },
  { word: "coffee", hint: "A morning ritual for many" },
  { word: "forest", hint: "A home for trees and creatures" },
  { word: "rainbow", hint: "Colors painted by light after rain" },
  { word: "planet", hint: "A round traveler around the sun" },

  // === Medium Words ===
  { word: "harvest", hint: "It comes after patience and care" },
  { word: "echo", hint: "It repeats what you say" },
  { word: "island", hint: "Land surrounded by water" },
  { word: "whisper", hint: "Quiet but powerful" },
  { word: "thunder", hint: "You hear it after the flash" },
  { word: "lantern", hint: "Carries light through darkness" },
  { word: "voyage", hint: "A journey across distance or time" },
  { word: "anchor", hint: "Keeps a ship steady" },
  { word: "memory", hint: "Fades, but never truly vanishes" },
  { word: "shadow", hint: "It follows you but never speaks" },
  { word: "melody", hint: "A song without words" },
  { word: "twilight", hint: "The hour between day and night" },
  { word: "silence", hint: "Heard by all, spoken by none" },
  { word: "compass", hint: "Always points you somewhere" },
  { word: "tranquil", hint: "Still and peaceful, like calm water" },

  // === Hard Words ===
  { word: "labyrinth", hint: "A maze, both literal and metaphorical" },
  { word: "serenity", hint: "Calmness that fills the soul" },
  { word: "ephemeral", hint: "Lasts for only a fleeting moment" },
  { word: "horizon", hint: "You see it but can never reach it" },
  { word: "illusion", hint: "Appears real but isn’t" },
  { word: "solitude", hint: "The company of oneself" },
  { word: "cascade", hint: "Water dancing over rocks" },
  { word: "silhouette", hint: "A shadow drawn by light" },
  { word: "fragrance", hint: "Invisible yet unforgettable" },
  { word: "ember", hint: "The last glow after the flame" },
  { word: "luminous", hint: "Shining softly in the dark" },
  { word: "enigmatic", hint: "Mysterious and puzzling" },
  { word: "paradox", hint: "A truth wrapped in contradiction" },
  { word: "celestial", hint: "Belonging to the stars" },
  { word: "resonance", hint: "A sound that lingers long after it’s gone" }
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
  let shuffled;
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
  scrambledWordEl.classList.remove("glow");
}

// Confetti animation (soft, Expo-style)
function triggerConfetti() {
  const duration = 1.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    createConfetti();
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.backgroundColor = `hsl(${Math.random() * 60 + 280}, 80%, 70%)`;
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 2000);
}

function animateCorrectWord() {
  scrambledWordEl.classList.add("glow");
  scrambledWordEl.textContent = currentWord.toUpperCase();
}

checkBtn.addEventListener("click", () => {
  const userGuess = inputEl.value.trim().toLowerCase();
  if (!userGuess) {
    messageEl.textContent = "Please enter your guess!";
    messageEl.style.color = "#ffdd57";
    return;
  }

  if (userGuess === currentWord) {
    messageEl.textContent = "Perfect! You got it!";
    messageEl.style.color = "#aaffaa";
    animateCorrectWord();
    triggerConfetti();
  } else {
    tries++;
    messageEl.style.color = "#ffaaaa";

    if (tries === 1) {
      messageEl.textContent = "Not quite — focus on the hint.";
    } else if (tries === 2) {
      messageEl.textContent = "Think slower — what does the clue *feel* like?";
    } else if (tries === 3) {
      messageEl.textContent = "Almost there. Try visualizing the meaning.";
    } else {
      messageEl.textContent = `The word was '${currentWord.toUpperCase()}'. Try another.`;
      messageEl.style.color = "#99ccff";
    }
  }
});

newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

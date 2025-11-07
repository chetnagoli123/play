const words = [
  // === Easy Words ===
  { word: "apple", hint: "A fruit that keeps the doctor away" },
  { word: "cloud", hint: "Floats gently in the sky" },
  { word: "garden", hint: "A place where flowers bloom" },
  { word: "shadow", hint: "It follows you but never speaks" },
  { word: "friend", hint: "Someone who truly listens" },
  { word: "dream", hint: "A glimpse of imagination in sleep" },
  { word: "forest", hint: "A home for trees and whispers" },
  { word: "planet", hint: "A round traveler around the sun" },
  { word: "mirror", hint: "It reflects, but never lies" },
  { word: "music", hint: "A rhythm that moves the soul" },

  // === Medium Words ===
  { word: "harvest", hint: "It comes after patience and care" },
  { word: "voyage", hint: "A journey across vastness" },
  { word: "echo", hint: "Repeats what you say" },
  { word: "compass", hint: "Always points you somewhere" },
  { word: "twilight", hint: "The sky’s in-between hour" },
  { word: "melody", hint: "A song carried by time" },
  { word: "horizon", hint: "You see it but can’t reach it" },
  { word: "silence", hint: "Heard by all, spoken by none" },
  { word: "anchor", hint: "Keeps a ship still in rough waves" },
  { word: "whisper", hint: "Soft, secret, and fleeting" },

  // === Hard Words ===
  { word: "serenity", hint: "Peace that lives within stillness" },
  { word: "labyrinth", hint: "A maze that confuses the mind" },
  { word: "solitude", hint: "The art of being alone without loneliness" },
  { word: "celestial", hint: "Of or relating to the heavens" },
  { word: "paradox", hint: "A truth wrapped in contradiction" },
  { word: "ephemeral", hint: "Lasts for only a brief moment" },
  { word: "enigmatic", hint: "Mysterious and hard to read" },
  { word: "cascade", hint: "Water in graceful motion" },
  { word: "fragrance", hint: "Invisible, but unforgettable" },
  { word: "luminous", hint: "Softly glowing in the dark" }
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
  hintEl.textContent = "";
  inputEl.value = "";
  messageEl.textContent = "";
  tries = 0;
  scrambledWordEl.classList.remove("glow");
}

// Confetti animation
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
    messageEl.className = "message correct";
    animateCorrectWord();
    triggerConfetti();
  } else {
    tries++;
    messageEl.className = "message incorrect";

    if (tries === 1) {
      messageEl.textContent = "Hmm… not quite yet. Try again!";
    } else if (tries === 2) {
      messageEl.textContent = "Keep going! You’re getting warmer.";
    } else if (tries === 3) {
      // Reveal the hint only now
      const hintText = words.find(w => w.word === currentWord).hint;
      hintEl.textContent = `Hint: ${hintText}`;
      hintEl.classList.add("visible");
      messageEl.textContent = "Here’s a little help — focus on the hint!";
      messageEl.style.color = "#ffdd57";
    } else {
      messageEl.textContent = `The word was '${currentWord.toUpperCase()}'. Try another one!`;
      messageEl.style.color = "#99ccff";
    }
  }
});

newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

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

// Shuffle word letters randomly, ensuring it’s not the same as the original
function shuffleWord(word) {
  let shuffled = "";
  do {
    shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
  } while (shuffled === word);
  return shuffled;
}

// Load a new random word
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

// Confetti animation when user wins
function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const confettis = Array.from({ length: 120 }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: Math.random() * 8 + 2,
    color: `hsl(${Math.random() * 50 + 290}, 80%, 60%)`, // gradient-themed colors
    speed: Math.random() * 3 + 2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(confetti => {
      ctx.fillStyle = confetti.color;
      ctx.fillRect(confetti.x, confetti.y, confetti.size, confetti.size);
      confetti.y += confetti.speed;
      if (confetti.y > window.innerHeight) confetti.y = 0;
    });
    requestAnimationFrame(draw);
  }

  draw();
  setTimeout(() => document.body.removeChild(canvas), 2000);
}

// Guess logic with subtle clues
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
    launchConfetti();
  } else {
    tries++;
    messageEl.style.color = "#ffaaaa";

    if (tries === 1) {
      messageEl.textContent = "Not quite. Think of the hint carefully.";
    } else if (tries === 2) {
      messageEl.textContent = "Closer! Try rearranging it in your head.";
    } else if (tries === 3) {
      messageEl.textContent = "You’re circling around it — stay focused!";
    } else {
      messageEl.textContent = `The word was '${currentWord.toUpperCase()}'. Try another!`;
      messageEl.style.color = "#99ccff";
    }
  }
});

newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

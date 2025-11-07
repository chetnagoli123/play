const words = [
  { word: "serenity", hint: "A calm state of mind" },
  { word: "labyrinth", hint: "A maze, both literal and metaphorical" },
  { word: "ephemeral", hint: "Lasts for a very short time" },
  { word: "horizon", hint: "You can see it but never reach it" },
  { word: "illusion", hint: "Seems real, but isn’t" },
  { word: "whisper", hint: "Soft, fleeting, and secretive" },
  { word: "solitude", hint: "Peace in one’s own company" },
  { word: "melody", hint: "A tune carried by time" },
  { word: "twilight", hint: "The sky’s in-between hour" },
  { word: "fragrance", hint: "Invisible, yet unforgettable" },
  { word: "voyage", hint: "A journey across vastness" },
  { word: "ember", hint: "A faint glow after the flame" },
  { word: "cascade", hint: "Water in graceful motion" },
  { word: "silhouette", hint: "The outline that remains when light fades" },
  { word: "tranquil", hint: "Undisturbed and at peace" }
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

// Word shuffler ensuring it's not same as original
function shuffleWord(word) {
  let shuffled;
  do {
    shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
  } while (shuffled === word);
  return shuffled;
}

// Load a new word
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

// Confetti animation (soft pastel, fades out)
function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 1000;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const confettis = Array.from({ length: 80 }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: Math.random() * 6 + 3,
    color: `hsl(${Math.random() * 40 + 290}, 80%, 70%)`,
    speed: Math.random() * 2 + 1
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(confetti => {
      ctx.fillStyle = confetti.color;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(confetti.x, confetti.y, confetti.size, 0, Math.PI * 2);
      ctx.fill();
      confetti.y += confetti.speed;
      if (confetti.y > window.innerHeight) confetti.y = 0;
    });
    requestAnimationFrame(draw);
  }

  draw();
  setTimeout(() => document.body.removeChild(canvas), 1800);
}

// Subtle fade and glow animation for correct answers
function animateCorrectWord() {
  scrambledWordEl.classList.add("glow");
  scrambledWordEl.textContent = currentWord.toUpperCase();
}

// Clue logic
checkBtn.addEventListener("click", () => {
  const userGuess = inputEl.value.trim().toLowerCase();
  if (!userGuess) {
    messageEl.textContent = "Please enter your guess!";
    messageEl.style.color = "#ffdd57";
    return;
  }

  if (userGuess === currentWord) {
    messageEl.textContent = "Perfect! You’ve got it!";
    messageEl.style.color = "#aaffaa";
    animateCorrectWord();
    launchConfetti();
  } else {
    tries++;
    messageEl.style.color = "#ffaaaa";

    if (tries === 1) {
      messageEl.textContent = "Not quite — let your mind wander around the clue.";
    } else if (tries === 2) {
      messageEl.textContent = "Think imagery — what does the clue *feel* like?";
    } else if (tries === 3) {
      messageEl.textContent = "You’re close, slow down and visualize it.";
    } else {
      messageEl.textContent = `The word was '${currentWord.toUpperCase()}'. Try another.`;
      messageEl.style.color = "#99ccff";
    }
  }
});

newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

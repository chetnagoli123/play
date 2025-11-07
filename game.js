const words = [
  // === Simple & Pleasant ===
  { word: "breeze", hint: "A gentle touch of air that calms" },
  { word: "sparkle", hint: "A tiny flash of light or joy" },
  { word: "lantern", hint: "Carries a glow through the night" },
  { word: "whistle", hint: "A sound made without words" },
  { word: "petal", hint: "Soft and colorful part of a bloom" },
  { word: "wander", hint: "To move without a set destination" },
  { word: "ocean", hint: "Endless blue that meets the sky" },
  { word: "meadow", hint: "A field where wildflowers dance" },
  { word: "ripple", hint: "A wave born from a single touch" },
  { word: "echo", hint: "Your words returning softly" },

  // === Medium & Expressive ===
  { word: "serene", hint: "Calm and untroubled" },
  { word: "mirage", hint: "An illusion seen in heat or hope" },
  { word: "willow", hint: "A tree that weeps gracefully" },
  { word: "velvet", hint: "Smooth, soft, and rich to touch" },
  { word: "aurora", hint: "A dance of lights across polar skies" },
  { word: "harbor", hint: "Where ships find rest and safety" },
  { word: "twinkle", hint: "What stars do from afar" },
  { word: "meander", hint: "To drift or follow a winding path" },
  { word: "sunrise", hint: "The world’s daily beginning" },
  { word: "ember", hint: "A faint glow that refuses to fade" },

  // === Charming & Uncommon ===
  { word: "serendipity", hint: "Finding something wonderful by accident" },
  { word: "murmur", hint: "A soft sound of voices or streams" },
  { word: "halcyon", hint: "A time of peace and happiness" },
  { word: "cascade", hint: "Water tumbling with grace" },
  { word: "wanderlust", hint: "A strong desire to explore" },
  { word: "solstice", hint: "The longest or shortest day of the year" },
  { word: "nostalgia", hint: "Warm feelings for things long past" },
  { word: "glisten", hint: "To shine with reflected light" },
  { word: "horizon", hint: "The meeting line of earth and sky" },
  { word: "melancholy", hint: "A sweet sadness of memory" }
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
  hintEl.classList.remove("visible");
  inputEl.value = "";
  messageEl.textContent = "";
  tries = 0;
  scrambledWordEl.classList.remove("glow");
}

// Confetti animation
function triggerConfetti() {
  const duration = 1.2 * 1000;
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
  confetti.style.backgroundColor = `hsl(${Math.random() * 50 + 270}, 90%, 70%)`;
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
    messageEl.textContent = "Beautiful! You got it right!";
    messageEl.className = "message correct";
    animateCorrectWord();
    triggerConfetti();
  } else {
    tries++;
    messageEl.className = "message incorrect";

    if (tries === 1) {
      messageEl.textContent = "Not quite — trust your instincts.";
    } else if (tries === 2) {
      messageEl.textContent = "Focus on the rhythm of the word.";
    } else if (tries === 3) {
      const hintText = words.find(w => w.word === currentWord).hint;
      hintEl.textContent = `Hint: ${hintText}`;
      hintEl.classList.add("visible");
      messageEl.textContent = "Here’s a soft nudge — read the hint closely.";
      messageEl.style.color = "#ffdd57";
    } else {
      messageEl.textContent = `The word was '${currentWord.toUpperCase()}'. Let’s try another!`;
      messageEl.style.color = "#99ccff";
    }
  }
});

newWordBtn.addEventListener("click", newWord);
window.addEventListener("load", newWord);

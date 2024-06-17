const cards = document.querySelectorAll(".memory-card");

let flipped = false;
let card1, card2;
let lock = false;
let count = 0;
let moves = 0;
let c = 0;
let best = 100;

// Define the winning condition and local storage item key based on the game mode
let gameMode = cards.length / 2;
let scoreKey = `score${gameMode}x${gameMode}`;

function flipCard() {
  if (lock) return;
  if (this === card1) return;

  this.classList.add("flip");

  if (!flipped) {
    flipped = true;
    card1 = this;
  } else {
    card2 = this;

    if (card1.dataset.name === card2.dataset.name) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      card1.removeEventListener("click", flipCard);
      card2.removeEventListener("click", flipCard);
      count++;
      if (count == gameMode) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        gameWon();
      }
      reset();
    } else {
      lock = true;
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        reset();
      }, 1300);
    }
    if (c != 1) moves++;
    document.getElementById("moves").innerHTML = moves;
  }
}

function reset() {
  flipped = false;
  lock = false;
  card1 = null;
  card2 = null;
}

(function shuffle() {
  cards.forEach((card) => {
    const random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})();

function gameWon() {
  bestScore();
  const popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  document
    .querySelectorAll(".container, .container1, .container2, .container3")
    .forEach((el) => {
      el.style.WebkitFilter = "blur(4px)";
      el.style.filter = "blur(4px)";
    });
}

function bestScore() {
  moves += 1;
  c = 1;
  if (moves < best) {
    best = moves;
    const score = best.toString();
    localStorage.setItem(scoreKey, score);
  }
}

document.getElementById("result").innerHTML = localStorage.getItem(scoreKey);
if (!isNaN(parseInt(localStorage.getItem(scoreKey), 10))) {
  best = parseInt(localStorage.getItem(scoreKey), 10);
}

cards.forEach((card) => card.addEventListener("click", flipCard));

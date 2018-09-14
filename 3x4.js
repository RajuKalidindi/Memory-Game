const cards = document.querySelectorAll('.memory-card');

function flipCard() {
  if(lock) return;
  if(this === card1) return;

  this.classList.toggle('flip');

  if(!flipped) {
    flipped = true;
    card1 = this;
  }
  else {
    card2 = this;

    if(card1.dataset.name === card2.dataset.name) {
      card1.removeEventListener('click', flipCard);
      card2.removeEventListener('click', flipCard);
      count++;
      if(count == 6)gameWon();

        reset();
    }
    else {
      lock = true;
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');

        reset();
      }, 1300);
    }
    if(c != 1) moves++;
    document.getElementById('moves').innerHTML = moves;
  }
}

function reset() {
  flipped = false;
  lock = false;
  card1 = null;
  card2 = null;
}

(function shuffle() {
  cards.forEach(card => {
    var random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})()

function gameWon() {
  bestscore();
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  document.getElementsByClassName("container")[0].style.WebkitFilter = 'blur(4px)';
  document.getElementsByClassName("container")[0].style.filter= 'blur(4px)';
  document.getElementsByClassName("container1")[0].style.WebkitFilter = 'blur(4px)';
  document.getElementsByClassName("container1")[0].style.filter= 'blur(4px)';
  document.getElementsByClassName("container2")[0].style.WebkitFilter = 'blur(4px)';
  document.getElementsByClassName("container2")[0].style.filter= 'blur(4px)';
}

function bestscore() {
  moves += 1;
  c = 1;
  if(moves < best) {
    best = moves;
    var score = best.toString();
    localStorage.setItem("score", score);
  }
}

var flipped = false;
var card1,card2;
var lock = false;
var count = 0;
var moves = 0;
var c = 0;
var best = 100;

document.getElementById("result").innerHTML = localStorage.getItem("score");
if(!isNaN(parseInt(localStorage.getItem("score"), 10))){
  best = parseInt(localStorage.getItem("score"), 10);
}

cards.forEach(card => card.addEventListener('click', flipCard));

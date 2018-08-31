const cards = document.querySelectorAll('.memory-card');

function flipCard() {
  this.classList.toggle('flip');

  if(!flipped) {
    flipped = true;
    card1 = this;
  }
  else {
    flipped = false;
    card2 = this;
  }
}

var flipped = false;
var card1,card2;

cards.forEach(card => card.addEventListener('click', flipCard));

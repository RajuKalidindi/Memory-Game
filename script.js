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

    if(card1.dataset.name === card2.dataset.name) {
      card1.removeEventListener('click', flipCard);
      card2.removeEventListener('click', flipCard);
    }
    else {
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
      }, 1300);
    }
  }
}

var flipped = false;
var card1,card2;

cards.forEach(card => card.addEventListener('click', flipCard));

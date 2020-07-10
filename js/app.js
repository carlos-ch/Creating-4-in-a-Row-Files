const game = new Game();


//Start game when button is clicked

const button = document.getElementById('begin-game');
button.addEventListener('click', function() {
  game.startGame();
  this.style.display = 'none';
  document.getElementById('play-area').style.opacity = '1';
});

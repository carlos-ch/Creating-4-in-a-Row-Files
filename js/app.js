const game = new Game();


//Start game when button is clicked

const button = document.getElementById('begin-game');
button.addEventListener('click', function() {
  game.startGame();
  this.style.display = 'none';
  document.getElementById('play-area').style.opacity = '1';
});

/**
 * Listens for keyboard presses
 */
 document.addEventListener('keydown', (event) => {
   game.handleKeydown(event);
   console.log(game.ready)
 });

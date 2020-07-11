class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers(2);
    this.ready = false;
  }


  /**
   * Returns active player
   * @return {object}   the active player
   */
  get activePlayer() {
    return this.players.find(player => player.active);
  }

  /**
   * Creates n player objects
   * @return {array}    Array with n player objects
   */
  createPlayers(n) {
    const players = [];
    const colors = ["#e15258", "#e59a13"]
    for (let i = 0; i < n; i++) {
      players.push(new Player(`Player ${i+1}`, (i+1), colors[i]))
    }
    players[0]['active'] = true;
    return players;
  }

  /**
   * Solution suggested by the instructor
   */
  // createPlayers() {
  //   const players = [ new Player('Player 1', 1, '#e15258', true),
  //                     new Player('Player 2', 2, "#e59a13")];
  //   return players;
  // }

  /**
   * Gets game ready for play
   */
  startGame(){
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  /**
   * Branches code, depending on what key user presses
   * @param {object}    event - Keydown event object
   */
  handleKeydown(event) {
    if (this.ready) {
      switch (event.key) {
        case "ArrowLeft":
          //move token to left
          this.activePlayer.activeToken.moveLeft()
          break;
        case "ArrowRight":
          //move toke to right
          this.activePlayer.activeToken.moveRight(this.board.columns)
          break;
        case "ArrowDown":
          //drop token
          this.playToken()
          break;
      }
    }
  }
  /**
   * Check for empty space in targeted column for token drop.
   * Check that the targeted column is not full
   */
  playToken() {
    let activeToken = this.activePlayer.activeToken
    let targetColumn = this.board.spaces[activeToken.columnLocation];
    let targetSpace = null;
    for (var i = 0; i < targetColumn.length; i++) {
      if (targetColumn[i].token === null) {
        targetSpace = targetColumn[i];
      }
    };
    if (targetSpace.y !== 0) {
      this.ready = false;
      activeToken.drop(targetSpace)
    }
  }
}

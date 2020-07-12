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
   * Creates n-number of player objects
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
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = this.board.spaces[activeToken.columnLocation];
    let targetSpace = null;
    for (var i = 0; i < targetColumn.length; i++) {
      if (targetColumn[i].token === null) {
        targetSpace = targetColumn[i];
      }
    };
    if (targetSpace !== null) {
      const game = this; // because scope change in callback
      game.ready = false;
      activeToken.drop(targetSpace, function() {
        game.updateGameState(activeToken, targetSpace)
      });
    }
  }

  /**
   * Updates game state after token is dropped.
   * @param {object}    token   - the token that's being  dropped
   * @param {object}    target  - the targeted space for the token
   */
  updateGameState(token, target) {
    target.mark(token);
    if (!this.checkForWin(target)) {
      this.switchPlayers();
      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
      }else{
        this.gameover(`No more tokens`);
      }
    } else {
      this.gameover(`${token.owner.name} wins!`)
    }
  }

  /**
  * Checks if the dropped token fills a space that leads to a winning move
  * @param {object}    target - targe space for the dropped token
  * @return {boolean}  boolean - boolean value identifying whether the game has been won or not.
  */
  // checkForWin(target) {
  //   const owner = target.token.owner;
  //   let win = false;
  //   const spaces = this.board.spaces;
  //
  //   // Check for vertical win
  //   for (y = tokenY; y < spaces[tokenX].length; y++) {
  //     if (spaces[tokenX][y].owner === owner) {
  //       rowCount++
  //     }
  //   }
  //   // Check for horizontal win
  //   for (x = tokenX; x < this.board.columns; x++) {
  //     if (spaces[tokenX][y].owner === owner) {
  //       rowCount++
  //     }
  //   }
  //
  // }

  /**
  * Solution suggested by the instructor
  */
  checkForWin(target) {
    const owner = target.token.owner;
    let win = false;
    const spaces = this.board.spaces;

    // Check for vertical win
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (spaces[x][y].owner === owner &&
          spaces[x][y+1].owner === owner &&
          spaces[x][y+2].owner === owner &&
          spaces[x][y+3].owner === owner) {
            win = true;
        }
      }
    }
    // Check for horizontal win
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (spaces[x][y].owner === owner &&
          spaces[x+1][y].owner === owner &&
          spaces[x+2][y].owner === owner &&
          spaces[x+3][y].owner === owner) {
            win = true;
        }
      }
    }
    // Check for diagonal win
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (spaces[x][y].owner === owner &&
          spaces[x-1][y+1].owner === owner &&
          spaces[x-2][y+2].owner === owner &&
          spaces[x-3][y+3].owner === owner) {
            win = true;
        }
      }
    }
    // Check for ascending diagonal  win
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (spaces[x][y].owner === owner &&
          spaces[x-1][y-1].owner === owner &&
          spaces[x-2][y-2].owner === owner &&
          spaces[x-3][y-3].owner === owner) {
            win = true;
        }
      }
    }
    return win;
  }

  /**
  * Switches active player
  */
  switchPlayers() {
  //  for (let player of this.players) {
  //    player.active = player.active === true? false : true;
  //  }
    const players = this.players
    for (let i = 0; i < players.length; i++) {
      if (players[i].active === true) {
       players[i].active = false;
      }else if(players[i].active === false) {
       players[i].active = true;
      }
    }
  }

  /**
  * Displays game over message
  * @param {string}   message - gameover
  */
  gameover(message) {
    let messageHtml = document.getElementById('game-over');
    messageHtml.style.display = 'block';
    messageHtml.textContent = message

  }

}

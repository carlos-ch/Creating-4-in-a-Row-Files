class Token {
  constructor(owner, index) {
    this.owner = owner;
    this.id = `token-${index}-${owner.id}`;
    this.dropped = false
  }
}


/**
* Each token can be linked to the individual player id
* The color of each token corresponds to the color of the player
* the token class can have the following properties:
* - status (used/not used)
* - id
* - color
* - position
* knowing if a token has been used in the game can be done by comparing its position to the empty/filled spaces in the game board.
*/

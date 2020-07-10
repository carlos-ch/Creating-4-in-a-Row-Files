class Space {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `space-${x}-${y}`;
    this.token = null;
  }

}

/**
* spaces in the board
* as the boards spaces are being filled, a method can make it impossible to drop a token where there's not a space
*/

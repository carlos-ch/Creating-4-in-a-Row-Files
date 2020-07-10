class Board {
  constructor() {
    this.rows = 6;
    this.columns = 7;
    this.spaces = generateSpaces();
  }

  /** This function creates a 2D array of spaces
  *@return {array}    an array of space objects
  */

  generateSpaces() {
    const spaces = [];

    for (var x = 0; x < this.columns; x++) {
      const column = [];

      for (let y = 0; y < this.rows; y++) {
        const space = new Space(x, y);
        column.push(space);
      }

      spaces.push(column);
    }
    return spaces;
  }
}


/** Properties and methods of the board object
* rows - columns - spaces can be part of the object
* a method that detects the position a token is dropped
*
*/

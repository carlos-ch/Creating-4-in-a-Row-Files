class Token {
  constructor(owner, index) {
    this.owner = owner;
    this.id = `token-${index}-${owner.id}`;
    this.dropped = false;
    this.columnLocation = 0;
  }

  /**
   * Gets associated htmlToken.
   * @return {element}    Html element assciated with token object
   */
   get htmlToken() {
     return document.getElementById(this.id)
   }

   /**
    * Gets left offset of html element
    * @return  {number}    Left offset of token object's htmlToken
    */
   get offsetLeft() {
     return this.htmlToken.offsetLeft
   }

  /**
   * Render for the HTML token
   */
  drawHTMLToken() {
    const token = document.createElement('div');
    document.getElementById('game-board-underlay').appendChild(token);
    token.setAttribute('id', this.id);
    token.setAttribute('class', 'token');
    token.style.backgroundColor = this.owner.color;
  }


  /**
   * moves html token object one column to left
   */
  moveLeft() {
    if (this.columnLocation !== 0) {
      this.htmlToken.style.left = this.offsetLeft - 76;
      this.columnLocation -= 1;
    }
  }

  /**
   * Moves html token one column to the right
   * @param {number}    columns - number of columns in the game board
   */
  moveRight(columns) {
    if (this.columnLocation !== columns - 1) {
      this.htmlToken.style.left = this.offsetLeft + 76;
      this.columnLocation += 1
    }
  }

  /**
   * Drops html token into targeted space
   * @param {object}    target - targeted space
   * @param {function}  reset  - reset function to call affter drop animation has completed
   */
   drop(target, reset) {
     this.dropped = true;

     $(this.htmlToken).animate({
        top: (target.y * target.diameter)
     }, 750, 'easeOutBounce', reset);

   }


}

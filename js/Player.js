class Player {
  constructor(name, id, color, active=false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createTokens(21);
  }

    /** Method for creating the array of tokens for each player
    *@param   {integer}   num - Number of token objects to be created
    *@return  {array}     the array of tokens for the player to use
    */

  createTokens(number) {
    const tokens = [];
    for (let i = 0; i < number; i++) {
      tokens.push(new Token(this, i))
    };
    return tokens;
  }

  /**
   * Gets all tokens that haven't been dropped
   * @return {array}    Array with unused tokens
   */
  get unusedTokens() {
    let undroppedTokens = this.tokens.filter(token => !token.dropped);
    return undroppedTokens;
  }

  /**
   * Gets the active token by returning the first object in the array of unused token objects
   * @return {object}   first token object of the array of unusedTokens
   */
  get activeToken() {
    return this.unusedTokens[0];

  }

  /**
   * Check if a player has  unused tokens left
   * @return {Boolean}    boolean value indicating if player has tokens left or not
   */
  checkTokens() {
    return this.tokens.some(token => token.dropped === false);
    /**
     * OR
     */
    // return this.unusedTokens.length == 0 ? false : true;
  }

}

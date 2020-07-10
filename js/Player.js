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


}



/**
*Differentiate between players through colors or numbers.
*instantiating a player using the class Player
*a token can have a coordinate or identifiable position on the Board
*Every token can have an id and be created using the token class
*The tokens will have different colors, the colors of the players
*Monitoring whose turn it is can be done highlighting the next token to be played, and its color will hint to the player next up.

*/

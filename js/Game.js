class Game {
  constructor() {
    this.board = ;
    this.players = createPlayers(2);
    this.ready = ;
  }

  createPlayers(n) {
    const players = [];
    for (let i = 0; i < n; i++) {
      players.push(new Player())
    }
  }


}

import Game from "../engine/game";

class FriskyEditor {
  workingGame;

  constructor() {
    this.initialize();
  }

  async initialize() {
    const starterFile = (await fetch('./starter.frisky').then(x => x.text()));

    this.workingGame = Game.parse(starterFile);
  }

  importGame() {

  }

  exportGame() {

  }
}

export default FriskyEditor;

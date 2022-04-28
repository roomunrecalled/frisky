import * as PIXI from 'pixi.js';
import testSprite from '../../assets/bill_riker_standing.png';

class FriskyEngine {
  options : PIXI.IRenderOptions;

  constructor (options: PIXI.IRenderOptions) {
    this.options = options;
  }

  run () {
    let ticker = PIXI.Ticker.shared;
    ticker.autoStart = false;
    ticker.stop();

    const stage = new PIXI.Container();
    const renderer = PIXI.autoDetectRenderer(this.options)

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let renderTexture = PIXI.RenderTexture.create({width: 192, height: 240});
    {

    }

    let sprite = PIXI.Sprite.from(testSprite);
    stage.addChild(sprite);

    // Add a ticker callback to move the sprite back and forth
    let elapsed = 0.0;
    ticker.add((delta) => {
      elapsed += delta;

      sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;

      renderer.render(stage);
    });

    ticker.start();
  }
}

export default FriskyEngine;

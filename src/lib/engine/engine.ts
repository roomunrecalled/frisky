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

    const center_stage = new PIXI.Container();
    center_stage.width = 480;
    center_stage.height = 320;
    const renderer = PIXI.autoDetectRenderer(this.options)

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let sprite = PIXI.Sprite.from(testSprite);
    const actor_stage = new PIXI.Container();
    actor_stage.width = 240;
    actor_stage.height = 160;
    actor_stage.scale = new PIXI.ObservablePoint(null, null, 2, 2);
    actor_stage.addChild(sprite);

    center_stage.addChild(actor_stage);

    // Add a ticker callback to move the sprite back and forth
    let elapsed = 0.0;
    ticker.add((delta) => {
      elapsed += delta;

      //sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;

      renderer.render(center_stage);
    });

    ticker.start();
  }
}

export default FriskyEngine;

import "phaser";
import TextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';

import MainScene from "./scenes/main-scene";


const config: Phaser.Types.Core.GameConfig = {
  width: 400,
  height: 400,
  type: Phaser.WEBGL,
  parent: "phaser",
  disableContextMenu: true,
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
  },
  plugins: {
    global: [{
        key: 'rexTextTyping',
        plugin: TextTypingPlugin,
        start: true
    },
    {
      key: 'rexBBCodeTextPlugin',
      plugin: BBCodeTextPlugin,
      start: true
    }
    ]
  },
  scene: MainScene
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  const game = new Game(config);
});

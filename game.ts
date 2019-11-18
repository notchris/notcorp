/* eslint-disable @typescript-eslint/no-var-requires */
import 'phaser';
import TextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin';
import LoginScene from './scenes/login-scene';
import RegisterScene from './scenes/register-scene';
import AboutScene from './scenes/about-scene';
import MainScene from './scenes/main-scene';
import StartScene from './scenes/start-scene';

const WebFont = require('webfontloader');
const VisitorFont = require('./assets/fonts/visitor.css');

const gameConfig: Phaser.Types.Core.GameConfig = {
  width: 400,
  height: 400,
  type: Phaser.WEBGL,
  parent: 'phaser',
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.NO_CENTER,
  },
  dom: {
    createContainer: true,
  },
  disableContextMenu: true,
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  plugins: {
    global: [
      {
        key: 'rexTextTyping',
        plugin: TextTypingPlugin,
        start: true,
      },
      {
        key: 'rexBBCodeTextPlugin',
        plugin: BBCodeTextPlugin,
        start: true,
      },
    ],
  },
  scene: [StartScene, LoginScene, RegisterScene, AboutScene, MainScene],
};

export class Game extends Phaser.Game {
  // eslint-disable-next-line no-useless-constructor
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  WebFont.load({
    custom: {
      families: ['Visitor TT1 BRK'],
      urls: [VisitorFont],
    },
    fontactive: (): void => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const game = new Game(gameConfig);
    },
  });
});

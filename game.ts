/* eslint-disable @typescript-eslint/no-var-requires */
import 'phaser';
import './assets/style.css';
import TextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin';
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin';
import FlashPlugin from 'phaser3-rex-plugins/plugins/flash-plugin';


import LoginScene from './scenes/login-scene';
import RegisterScene from './scenes/register-scene';
import StartScene from './scenes/start-scene';
import MainScene from './scenes/main-scene';
import TestListScene from './scenes/test-scene';

// Tests
import TestDefault from './scenes/test/test_default';
import TestNPC from './scenes/test/test_npc';
import TestItem from './scenes/test/test_item';
import TestToggle from './scenes/test/test_toggle';
import TestDoor from './scenes/test/test_door';
import TestDoor2 from './scenes/test/test_door2';
import TestObstacle from './scenes/test/test_obstacle';

import IntroScene from './scenes/intro/intro';

const WebFont = require('webfontloader');

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
      {
        key: 'rexMoveTo',
        plugin: MoveToPlugin,
        start: true,
      },
      {
        key: 'rexFlash',
        plugin: FlashPlugin,
        start: true,
      },
    ],
  },
  scene: [StartScene, LoginScene, RegisterScene, TestListScene, IntroScene, MainScene,
    TestDefault, TestNPC, TestItem, TestToggle, TestDoor, TestDoor2, TestObstacle],
};

export class Game extends Phaser.Game {
  // eslint-disable-next-line no-useless-constructor
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  WebFont.load({
    google: {
      families: ['Bree Serif'],
    },
    fontactive: (): void => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const game = new Game(gameConfig);
    },
  });
});

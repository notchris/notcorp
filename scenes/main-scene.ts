import Player from '../classes/Player';
import Controls from '../util/Controls';
import Dialog from './dialog';

export default class MainScene extends Phaser.Scene {
  public player: Player;
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public controls: Controls;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  preload(): void {
    this.load.spritesheet('player', '../assets/character/player.png',
      {
        frameWidth: 16, frameHeight: 32, margin: 0, spacing: 0,
      });
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, 20 * 16, 20 * 16);
    this.physics.world.setBounds(0, 0, 20 * 16, 20 * 16);
    this.player = new Player(this, 100, 100, 'player', 0);
    this.controls = new Controls(this, this.input.keyboard, this.player);

    this.cameras.main.setBackgroundColor('#9bfbf0');
    this.cameras.main.fadeIn(1000);
    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.player);

    const graphics = this.add.graphics();
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillRect(40, 40, 40, 40);
  }

  startDialog(): void {
    this.player.frozen = true;
    this.scene.add('Dialog', new Dialog('This is an example dialog.'), true, {});
  }

  update(): void {
    this.controls.update();
  }
}

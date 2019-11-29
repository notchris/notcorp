import TestUI from './ui';
import Player from '../../classes/Player';
import Controls from '../../util/Controls';
import Obstacle from '../../classes/Obstacle';

export default class TestObstacle extends Phaser.Scene {
  public player: Player;
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public controls: Controls;
  public title: string;

  constructor() {
    super({
      key: 'TestObstacle',
    });
  }

  preload(): void {
    this.load.spritesheet('player', '../assets/character/player.png',
      {
        frameWidth: 16, frameHeight: 32, margin: 0, spacing: 0,
      });
    this.load.spritesheet('patterns', '../assets/ui/patterns.png',
      {
        frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0,
      });
  }

  init(data): void {
    this.title = data.title;
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, 14 * 16, 14 * 16);
    this.physics.world.setBounds(0, 0, 14 * 16, 14 * 16);

    /** Sandbox logic */
    const testBounds = this.add.graphics();
    testBounds.lineStyle(4, 0x000000, 1);
    testBounds.strokeRect(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
    const testPattern = this.add.tileSprite(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height, 'patterns', 2);
    testPattern.setOrigin(0);
    testPattern.setTileScale(8, 8);
    testPattern.alpha = 0.1;

    /** Player & controls */
    this.player = new Player(this, 100, 100, 'player', 0);
    this.controls = new Controls(this, 'controls', this.input.keyboard, this.player);

    /** Camera */
    this.cameras.main.setBackgroundColor('#dddddd');
    this.cameras.main.fadeIn(1000);
    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.player);

    const testObstacle = new Obstacle(this, 100, 200, null, 0);


    /** Sandbox logic */
    this.scene.add('TestUI', new TestUI(this, this.player, this.title, this.scene.key), true, {});
    this.events.on('back', () => {
      this.scene.start('TestListScene', {});
      this.scene.stop(this.scene.key);
    }, this);
  }

  update(): void {
    this.controls.update();
  }
}

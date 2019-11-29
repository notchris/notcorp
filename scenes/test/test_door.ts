import TestUI from './ui';
import Player from '../../classes/Player';
import Controls from '../../util/Controls';
import Toggle from '../../classes/Toggle';
import Door from '../../classes/Door';

export default class TestDoor extends Phaser.Scene {
  public player: Player;
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public controls: Controls;
  public title: string;

  constructor() {
    super({
      key: 'TestDoor',
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

    const testBounds = this.add.graphics();
    testBounds.lineStyle(4, 0x000000, 1);
    testBounds.strokeRect(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
    const testPattern = this.add.tileSprite(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height, 'patterns', 2);
    testPattern.setOrigin(0);
    testPattern.setTileScale(8, 8);
    testPattern.alpha = 0.1;

    this.player = new Player(this, 100, 100, 'player', 0);
    this.controls = new Controls(this, 'controls', this.input.keyboard, this.player);

    const testWallA = this.physics.add.sprite(40, 40, null, 0);
    testWallA.body.height = 10;
    testWallA.body.width = 80;
    testWallA.displayHeight = 10;
    testWallA.displayWidth = 80;
    testWallA.setImmovable(true);

    const testWallB = this.physics.add.sprite(160, 40, null, 0);
    testWallB.body.height = 10;
    testWallB.body.width = 120;
    testWallB.displayHeight = 10;
    testWallB.displayWidth = 120;
    testWallB.setImmovable(true);

    this.physics.add.collider(this.player, [testWallA, testWallB]);

    this.cameras.main.setBackgroundColor('#dddddd');
    this.cameras.main.fadeIn(1000);
    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.player);

    const testToggle = new Toggle(this, 40, 100, null, 0);
    const testDoor = new Door(this, 90, 40, null, 0, true, testToggle);

    this.scene.add('TestUI', new TestUI(this, this.player, this.title, this.scene.key), true, {});

    // End Test
    this.events.on('back', () => {
      this.scene.start('TestListScene', {});
      this.scene.stop(this.scene.key);
    }, this);
  }

  update(): void {
    this.controls.update();
  }
}

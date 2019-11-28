import Backpack from './Backpack';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    public speed: number;
    public direction: string;
    public use: boolean;
    public sensor: Phaser.Physics.Arcade.Sprite;
    public frozen: boolean;
    public backpack: Backpack;
    public startX: number;
    public startY: number;
    public dead: boolean;
    public flash: any;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
      super(scene, x, y, texture, frame);

      /** Sprite properties */
      this.setTexture(texture);
      this.setPosition(x, y);
      this.startX = x;
      this.startY = y;
      scene.physics.world.enable(this); // necessary?
      scene.add.existing(this);

      /** Set backpack */
      this.backpack = new Backpack(scene, 'other', 1, []);

      /** Physics body properties */
      this.body.setBounce(0, 0);
      this.body.setCollideWorldBounds(true);
      this.body.width = 14;
      this.body.height = 12;
      this.body.offset.x = 1;
      this.body.offset.y = 14;

      /** Custom properties */
      this.speed = 80;
      this.direction = 'down';
      this.use = false;
      this.frozen = false;
      this.dead = false;

      /** Player Use Sensor */
      this.sensor = this.scene.physics.add.sprite(this.x, this.y + 2, '', 0);
      this.sensor.visible = true;
      this.sensor.displayHeight = 8;
      this.sensor.displayWidth = 8;
      this.sensor.body.width = 8;
      this.sensor.body.height = 8;

      /** Flash config */
      this.flash = (this.scene.plugins as any).get('rexFlash').add(this);

      /** Sprite Animations */
      const frames = scene.anims.generateFrameNumbers('player', {});
      scene.anims.create({
        key: 'idleUp',
        frames: [frames[8]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: 'idleDown',
        frames: [frames[0]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: 'idleLeft',
        frames: [frames[12]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: 'idleRight',
        frames: [frames[4]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: 'walkUp',
        frames: [frames[8], frames[9], frames[10], frames[11]],
        frameRate: 6,
        repeat: -1,
      });

      scene.anims.create({
        key: 'walkDown',
        frames: [frames[0], frames[1], frames[2], frames[3]],
        frameRate: 6,
        repeat: -1,
      });

      scene.anims.create({
        key: 'walkLeft',
        frames: [frames[12], frames[13], frames[14], frames[15]],
        frameRate: 6,
        repeat: -1,
      });

      scene.anims.create({
        key: 'walkRight',
        frames: [frames[4], frames[5], frames[6], frames[7]],
        frameRate: 6,
        repeat: -1,
      });
    }

    /** Movement */

    moveUp(): void {
      this.body.setVelocityY(-this.speed);
      this.anims.play('walkUp', true);
      this.direction = 'up';
    }

    moveDown(): void {
      this.body.setVelocityY(this.speed);
      this.anims.play('walkDown', true);
      this.direction = 'down';
    }

    moveLeft(): void {
      this.body.setVelocityX(-this.speed);
      this.anims.play('walkLeft', true);
      this.direction = 'left';
    }

    moveRight(): void {
      this.body.setVelocityX(this.speed);
      this.anims.play('walkRight', true);
      this.direction = 'right';
    }

    /** Death */

    death(): void {
      this.dead = true;
      this.frozen = true;
      this.scene.cameras.main.stopFollow();
      this.scene.cameras.main.flash(500, 255, 0, 0, false);
      this.x = this.startX;
      this.y = this.startY;
      this.setPosition(this.x, this.y);
      this.flash.flash({
        duration: 500,
        repeat: 2,
      });
      this.scene.cameras.main.pan(this.x, this.y, 2000, 'Power2');
      this.scene.time.delayedCall(2000, () => {
        this.scene.cameras.main.startFollow(this);
        this.dead = false;
        this.frozen = false;
      }, [], this);
    }

    /** Helpers */

    updateSensorPosition(): void {
      switch (this.direction) {
        case 'up':
          this.sensor.y = this.y;
          this.sensor.x = this.x;
          break;
        case 'down':
          this.sensor.y = this.y + 8;
          this.sensor.x = this.x;
          break;
        case 'left':
          this.sensor.y = this.y + 2;
          this.sensor.x = this.x - 5;
          break;
        case 'right':
          this.sensor.y = this.y + 2;
          this.sensor.x = this.x + 5;
          break;
        default:
          break;
      }
    }

    oppositeDirection(): string {
      let opposite: string;
      switch (this.direction) {
        case 'up':
          opposite = 'down';
          break;
        case 'down':
          opposite = 'up';
          break;
        case 'left':
          opposite = 'right';
          break;
        case 'right':
          opposite = 'left';
          break;
        default:
          break;
      }
      return opposite;
    }

    /** Update */

    preUpdate(time: any, delta: any): void {
      super.preUpdate(time, delta);
      this.updateSensorPosition();
    }
}

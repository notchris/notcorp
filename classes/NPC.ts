export default class NPC extends Phaser.Physics.Arcade.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    public patrol: boolean;
    public speed: number;
    public direction: string;
    public moveTo: any;
    public playerCollider: Phaser.Physics.Arcade.Collider;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number,
      patrol: boolean) {
      super(scene, x, y, texture, frame);

      /** Sprite properties */
      this.setTexture(texture);
      this.setPosition(x, y);
      scene.physics.world.enable(this);
      scene.add.existing(this);

      /** Patrol */
      this.patrol = patrol;

      /** MoveTo */
      this.moveTo = (scene.plugins.get('rexMoveTo') as any).add(this, {
        speed: 20,
        rotateToTarget: false,
      });

      this.moveTo.on('complete', () => {
        this.scene.time.delayedCall(500, () => {
          this.startPatrol();
        }, [], this);
      });

      /** Physics body properties */
      this.body.setBounce(0, 0);
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      this.body.width = 14;
      this.body.height = 12;
      this.body.offset.x = 1;
      this.body.offset.y = 14;

      /** Custom properties */
      this.speed = 80;
      this.direction = 'down';

      /** Sprite Animations */
      const frames = scene.anims.generateFrameNumbers(texture, {});
      scene.anims.create({
        key: `${this.texture.key}_idleUp`,
        frames: [frames[8]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: `${this.texture.key}_idleDown`,
        frames: [frames[0]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: `${this.texture.key}_idleLeft`,
        frames: [frames[12]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: `${this.texture.key}_idleRight`,
        frames: [frames[4]],
        frameRate: 1,
        repeat: -1,
      });

      scene.anims.create({
        key: `${this.texture.key}_walkUp`,
        frames: [frames[8], frames[9], frames[10], frames[11]],
        frameRate: 6,
        repeat: -1,
      });

      scene.anims.create({
        key: `${this.texture.key}_walkDown`,
        frames: [frames[0], frames[1], frames[2], frames[3]],
        frameRate: 6,
        repeat: -1,
      });

      scene.anims.create({
        key: `${this.texture.key}_walkLeft`,
        frames: [frames[12], frames[13], frames[14], frames[15]],
        frameRate: 6,
        repeat: -1,
      });

      scene.anims.create({
        key: `${this.texture.key}_walkRight`,
        frames: [frames[4], frames[5], frames[6], frames[7]],
        frameRate: 6,
        repeat: -1,
      });

      /** NPC / Player collision  */
      this.playerCollider = scene.physics.add.collider((scene as any).player, this, () => {
        this.moveTo.pause();
        this.scene.time.delayedCall(2000, () => {
          this.moveTo.resume();
        }, [], this);
      });

      /** Set NPC patrol boundary */
      this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(this.x - 50, this.y - 50, 100, 100));
      this.body.setCollideWorldBounds();
      const boundTest = scene.add.graphics();
      boundTest.lineStyle(2, 0xff0000, 1);
      boundTest.strokeRect(this.x - 50, this.y - 50, 100, 100);

      /** Start NPC patrol loop */
      if (this.patrol) {
        this.startPatrol();
      }
    }

    /** Movement */
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

    /** Switch direction */
    directionSwitch(): void {
      if (this.moveTo.isRunning) {
        switch (this.direction) {
          case 'up':
            this.anims.play(`${this.texture.key}_walkUp`, true);
            break;
          case 'down':
            this.anims.play(`${this.texture.key}_walkDown`, true);
            break;
          case 'left':
            this.anims.play(`${this.texture.key}_walkLeft`, true);
            break;
          case 'right':
            this.anims.play(`${this.texture.key}_walkRight`, true);
            break;
          default:
            break;
        }
      } else {
        switch (this.direction) {
          case 'up':
            this.anims.play(`${this.texture.key}_idleUp`, true);
            break;
          case 'down':
            this.anims.play(`${this.texture.key}_idleDown`, true);
            break;
          case 'left':
            this.anims.play(`${this.texture.key}_idleLeft`, true);
            break;
          case 'right':
            this.anims.play(`${this.texture.key}_idleRight`, true);
            break;
          default:
            break;
        }
      }
    }

    /** Stop Patrol */
    stopPatrol(): void {
      this.moveTo.stop();
    }
    /** Start Patrol */
    startPatrol(): void {
      /** Random direction loop */
      this.direction = this.randomDirection();
      switch (this.direction) {
        case 'up':
          this.moveTo.moveTo(this.x, this.y - 60);
          break;
        case 'down':
          this.moveTo.moveTo(this.x, this.y + 60);
          break;
        case 'left':
          this.moveTo.moveTo(this.x - 60, this.y);
          break;
        case 'right':
          this.moveTo.moveTo(this.x + 60, this.y);
          break;
        default:
          break;
      }
    }

    /** Random direction */
    randomDirection(): string {
      const directions = ['up', 'down', 'left', 'right'];
      return directions[Math.floor(Math.random() * directions.length)];
    }

    /** Update */
    preUpdate(time: any, delta: any): void {
      super.preUpdate(time, delta);
      this.directionSwitch();
      if (!this.body.blocked.none) {
        this.startPatrol();
      }
    }
}

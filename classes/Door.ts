import Item from './Item';
import Toggle from './Toggle';

export default class Door extends Phaser.Physics.Arcade.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    public locked: boolean;
    public unlock: Item | Toggle;
    constructor(
      scene: Phaser.Scene,
      x: number, y: number,
      texture: string,
      frame: number,
      locked: boolean,
      unlock: Item | Toggle,
    ) {
      super(scene, x, y, texture, frame);

      /** Initial Door state */
      this.locked = locked;

      /** Unlock requirement */
      this.unlock = unlock;

      /** Sprite properties */
      if (texture) {
        this.setTexture(texture);
      } else {
        const DoorTestOff = this.scene.add.graphics();
        DoorTestOff.fillStyle(0xff0000, 1);
        DoorTestOff.fillRect(0, 0, 8, 8);
        DoorTestOff.generateTexture('testDoorOff', 8, 8);
        DoorTestOff.destroy(true);

        const DoorTestOn = this.scene.add.graphics();
        DoorTestOn.fillStyle(0x00ff00, 1);
        DoorTestOn.fillRect(0, 0, 8, 8);
        DoorTestOn.generateTexture('testDoorOn', 8, 8);
        DoorTestOn.destroy(true);

        this.setTexture('testDoorOff');
      }
      this.setPosition(x, y);
      scene.physics.world.enable(this);
      scene.add.existing(this);

      /** Physics body properties */
      this.body.setBounce(0, 0);
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      this.body.setSize(8, 8);

      /** Door / Player collision  */
      scene.physics.add.collider((scene as any).player, this);

      /** Door / Player sensor overlap */
      scene.physics.add.overlap((scene as any).player.sensor, this, () => {
        if ((scene as any).player.use) {
          this.openDoor();
        }
      });
    }

    /** Open door */
    openDoor(): void {
      if (!this.locked) return;
      if (this.unlock instanceof Item) {
        // todo
      }
    }

    /** Update */
    preUpdate(time: any, delta: any): void {
      super.preUpdate(time, delta);
    }
}

import Item from './Item';
import Dialog from '../scenes/event/dialog';
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
        const testDoor = this.scene.add.graphics();
        testDoor.fillStyle(0x999999, 1);
        testDoor.fillRect(0, 0, 16, 16);
        testDoor.fillStyle(0x333333, 1);
        testDoor.fillCircle(4, 8, 1.5);
        testDoor.generateTexture('testDoor', 16, 16);
        testDoor.destroy(true);

        this.setTexture('testDoor');
      }
      this.setPosition(x, y);
      scene.physics.world.enable(this);
      scene.add.existing(this);

      /** Physics body properties */
      this.body.setBounce(0, 0);
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      this.body.setSize(16, 16);

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
        const hasItem = (this.scene as any).player.backpack.checkItem(this.unlock.itemId);
        if (hasItem) {
          (this.scene as any).player.backpack.removeItem(this.unlock.itemId);
          this.locked = false;
        } else {
          (this.scene as any).player.frozen = true;
          this.scene.scene.add(
            'DialogA',
            new Dialog([['The door is locked.']], null, this.scene.scene.key),
            true,
            {},
          );
        }
      } else if (this.unlock instanceof Toggle) {
        (this.scene as any).player.frozen = true;
        this.scene.scene.add(
          'DialogA',
          new Dialog([['The door is locked.']], null, this.scene.scene.key),
          true,
          {},
        );
      } else {
        (this.scene as any).player.frozen = true;
        this.scene.scene.add(
          'DialogA',
          new Dialog([['The door is locked.']], null, this.scene.scene.key),
          true,
          {},
        );
      }
    }

    /** Update */
    preUpdate(time: any, delta: any): void {
      super.preUpdate(time, delta);

      // Toggle Door logic (non-item)
      if (this.unlock instanceof Toggle) {
        if ((this.unlock as any).isToggled) {
          this.locked = false;
        } else {
          this.locked = true;
        }
      }

      if (!this.locked) {
        this.setVisible(false);
        this.scene.physics.world.disable(this);
      } else {
        this.setVisible(true);
        this.scene.physics.world.enable(this);
      }
    }
}

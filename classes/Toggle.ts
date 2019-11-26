export default class Toggle extends Phaser.Physics.Arcade.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    public isToggled: boolean;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
      super(scene, x, y, texture, frame);

      /** Sprite properties */
      if (texture) {
        this.setTexture(texture);
      } else {
        const toggleTestOff = this.scene.add.graphics();
        toggleTestOff.fillStyle(0xff0000, 1);
        toggleTestOff.fillRect(0, 0, 8, 8);
        toggleTestOff.generateTexture('testToggleOff', 8, 8);
        toggleTestOff.destroy(true);

        const toggleTestOn = this.scene.add.graphics();
        toggleTestOn.fillStyle(0x00ff00, 1);
        toggleTestOn.fillRect(0, 0, 8, 8);
        toggleTestOn.generateTexture('testToggleOn', 8, 8);
        toggleTestOn.destroy(true);

        this.setTexture('testToggleOff');
      }
      this.setPosition(x, y);
      scene.physics.world.enable(this);
      scene.add.existing(this);

      /** Physics body properties */
      this.body.setBounce(0, 0);
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      this.body.setSize(8, 8);

      /** Toggle / Player collision  */
      scene.physics.add.collider((scene as any).player, this);

      /** Toggle / Player sensor overlap */
      scene.physics.add.overlap((scene as any).player.sensor, this, () => {
        if ((scene as any).player.use) {
          this.isToggled = !this.isToggled;
        }
      });
    }

    /** Update */
    preUpdate(time: any, delta: any): void {
      super.preUpdate(time, delta);
      if (this.isToggled) {
        this.setTexture('testToggleOn');
      } else {
        this.setTexture('testToggleOff');
      }
    }
}

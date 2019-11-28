export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    constructor(
      scene: Phaser.Scene,
      x: number, y: number,
      texture: string,
      frame: number,
    ) {
      super(scene, x, y, texture, frame);

      /** Sprite properties */
      if (texture) {
        this.setTexture(texture);
      } else {
        const testObstacle = this.scene.add.graphics();
        testObstacle.fillStyle(0xff0000, 1);
        testObstacle.fillRect(0, 0, 100, 40);
        testObstacle.generateTexture('testObstacle', 100, 40);
        testObstacle.destroy(true);
        this.setTexture('testObstacle');
      }
      this.setPosition(x, y);
      scene.physics.world.enable(this);
      scene.add.existing(this);

      /** Physics body properties */
      this.body.setBounce(0, 0);
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      this.body.setSize(100, 40);

      /** Obstacle / Player collision  */
      scene.physics.add.collider((scene as any).player, this, () => { this.onPlayerCollide(); });
    }

    /** Player touches obstacle */
    onPlayerCollide(): void {
      (this.scene as any).player.death();
    }

    /** Update */
    preUpdate(time: any, delta: any): void {
      super.preUpdate(time, delta);
    }
}

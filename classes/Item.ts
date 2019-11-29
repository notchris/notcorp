import Dialog from '../scenes/event/dialog';

import ItemList = require('../data/items.json');

export default class Item extends Phaser.Physics.Arcade.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    public itemId: number;
    public title: string;
    public description: string;
    public droppable: boolean;
    constructor(
      scene: Phaser.Scene,
      x: number, y: number,
      texture: string,
      frame: number,
      itemId: number,
    ) {
      super(scene, x, y, texture, frame);
      this.scene = scene;

      /** Item properties */
      this.itemId = itemId;
      const itemDetails = ItemList.filter((item: any) => item.id === this.itemId)[0];
      this.title = itemDetails.title;
      this.description = itemDetails.description;
      this.droppable = itemDetails.droppable;

      /** Sprite properties */
      if (texture) {
        this.setTexture(texture);
      } else {
        const itemTest = this.scene.add.graphics();
        itemTest.fillStyle(0xffea01, 1);
        itemTest.fillCircle(4, 4, 4);
        itemTest.generateTexture('testItem', 8, 8);
        itemTest.destroy(true);
        this.setTexture('testItem');
      }
      this.setPosition(x, y);
      scene.physics.world.enable(this);
      scene.add.existing(this);

      /** Physics body properties */
      this.body.setBounce(0, 0);
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      this.body.setSize(8, 8);

      /** Item / Player collision  */
      scene.physics.add.collider((scene as any).player, this);

      /** Item / Player sensor overlap */
      scene.physics.add.overlap((scene as any).player.sensor, this, () => {
        if ((scene as any).player.use) {
          this.getItem();
        }
      });
    }

    getItem(): void {
      (this.scene as any).player.frozen = true;
      const didAddItem = (this.scene as any).player.backpack.addItem(this);
      if (!didAddItem) {
        // Backpack is full
        this.scene.scene.add(
          'DialogA',
          new Dialog([['Your backpack if full!']], null, this.scene.scene.key),
          true,
          {},
        );
      } else {
        // Added item to backpack
        this.scene.scene.add(
          'DialogA',
          new Dialog([[`You found: [color=#73c08c]${this.title}[/color].`], [this.description], [`You put the [color=#73c08c]${this.title}[/color] in your backpack.`]], null, this.scene.scene.key),
          true,
          {},
        );
        this.destroy();
      }
    }

    /** Update */
    preUpdate(time: any, delta: any): void {
      super.preUpdate(time, delta);
    }
}

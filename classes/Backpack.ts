import Item from './Item';

export default class Backpack extends Phaser.GameObjects.GameObject {
    public maxItems: number;
    public items: Array<Item>;
    constructor(scene: Phaser.Scene, type: string, maxItems: number, items: Array<Item>) {
      super(scene, type);
      this.maxItems = maxItems;
      this.items = items;
    }

    addItem(item: Item): boolean {
      if (this.items.length < this.maxItems) {
        this.items.push(item);
        return true;
      }
      return false;
    }
}

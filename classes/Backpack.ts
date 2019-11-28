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

    checkItem(id: number): boolean {
      const filterItem = this.items.filter((item) => item.itemId === id);
      if (!filterItem.length) {
        return false;
      }
      return true;
    }

    removeItem(id: number): boolean {
      const filterItem = this.items.filter((item) => item.itemId === id);
      if (filterItem.length) {
        const index = this.items.indexOf(filterItem[0]);
        this.items.splice(index, 1);
        return true;
      }
      return false;
    }
}

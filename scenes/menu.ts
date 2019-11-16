
import MenuStatus from './menu-status';
import MenuBackpack from './menu-backpack';
import MenuNotebook from './menu-notebook';
import MenuSettings from './menu-settings';

export default class Menu extends Phaser.Scene {
  keyEnter: Phaser.Input.Keyboard.Key;
  keyUp: Phaser.Input.Keyboard.Key;
  keyDown: Phaser.Input.Keyboard.Key;
  menuIndex: number;
  menuItems: Array<any>;
  menuObjects: Array<any>;
  timeText: Phaser.GameObjects.Text;
  constructor() {
    super({
      key: 'Menu',
    });

    this.keyEnter = null;
    this.keyUp = null;
    this.keyDown = null;

    this.menuIndex = 0;
    this.menuObjects = [];
    this.menuItems = [{
      id: 'status',
      title: 'Status',
      scene: 'MenuStatus',
    }, {
      id: 'backpack',
      title: 'Backpack',
      scene: 'MenuBackpack',
    }, {
      id: 'notebook',
      title: 'Notebook',
      scene: 'MenuNotebook',
    }, {
      id: 'settings',
      title: 'Settings',
      scene: 'MenuSettings',
    }, {
      id: 'save',
      title: 'Save',
    }, {
      id: 'close',
      title: 'Close',
    }];
    this.timeText = null;
  }

  preload(): void {
    this.load.spritesheet('patterns', '../assets/ui/patterns.png',
      {
        frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0,
      });
  }

  create(): void {
    this.scene.pause('MainScene');
    this.scene.pause('Dialog');
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    /** Menu black transparent background */
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(0, 0, 400, 400);

    /** Time panel outer border */
    const timePanel = this.add.graphics();
    timePanel.fillStyle(0x4aa3e4, 1);
    timePanel.fillRoundedRect(10, 10, 150, 40, 2);
    timePanel.lineStyle(2, 0x000000, 1);
    timePanel.strokeRoundedRect(10, 10, 150, 40, 2);

    /** Time panel pattern image fill */
    const imageTime = this.add.tileSprite(10, 10, 150, 40, 'patterns', 2);
    imageTime.setOrigin(0);
    imageTime.setTileScale(3, 3);
    imageTime.alpha = 0.5;

    /** Time panel inner */
    const timePanelB = this.add.graphics();
    timePanelB.fillStyle(0xEEEEEE, 1);
    timePanelB.fillRoundedRect(15, 15, 140, 30, 2);
    timePanelB.lineStyle(1, 0x000000, 1);
    timePanelB.strokeRoundedRect(15, 15, 140, 30, 2);

    /** Time text */
    this.timeText = this.add.text(50, 20, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
    /** Menu panel outer border */
    const menuPanel = this.add.graphics();
    menuPanel.fillStyle(0x4aa3e4, 1);
    menuPanel.fillRoundedRect(250, 10, 140, 200, 2);
    menuPanel.lineStyle(2, 0x000000, 1);
    menuPanel.strokeRoundedRect(250, 10, 140, 200, 2);

    /** Menu panel pattern image fill */
    const imageMenu = this.add.tileSprite(250, 10, 140, 200, 'patterns', 2);
    imageMenu.setOrigin(0);
    imageMenu.setTileScale(3, 3);
    imageMenu.alpha = 0.5;

    /** Menu panel inner */
    const menuPanelB = this.add.graphics();
    menuPanelB.fillStyle(0xEEEEEE, 1);
    menuPanelB.fillRoundedRect(255, 15, 130, 190, 2);
    menuPanelB.lineStyle(1, 0x000000, 1);
    menuPanelB.strokeRoundedRect(255, 15, 130, 190, 2);

    /** Menu items */
    this.menuItems.forEach((item, i) => {
      const itemText = this.add.text(265, (24 * i) + 24, item.title, { fontFamily: 'Arial', fontSize: 18, color: '#000000' });
      this.menuObjects.push(itemText);
    });

    /** Sub Scenes */
    this.scene.add('MenuStatus', MenuStatus, true, {});
    this.scene.add('MenuBackpack', MenuBackpack, true, {});
    this.scene.add('MenuNotebook', MenuNotebook, true, {});
    this.scene.add('MenuSettings', MenuSettings, true, {});
  }

  update(): void {
    const d = new Date();
    const s = d.getSeconds() < 10 ? (`0${d.getSeconds()}`) : d.getSeconds();
    const m = d.getMinutes() < 10 ? (`0${d.getMinutes()}`) : d.getMinutes();
    const h = d.getHours() < 10 ? (`0${d.getHours()}`) : d.getHours();
    const time = `${h}:${m}:${s}`;
    this.timeText.text = time;

    for (let i = 0; i < this.menuObjects.length; i += 1) {
      if (i === this.menuIndex) {
        this.menuObjects[i].setColor('#005397');
        if (this.menuItems[i].scene) {
          this.scene.get(this.menuItems[i].scene).scene.setVisible(true);
        }
      } else {
        this.menuObjects[i].setColor('#000000');
        if (this.menuItems[i].scene) {
          this.scene.get(this.menuItems[i].scene).scene.setVisible(false);
        }
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
      if (this.menuItems[this.menuIndex].id === 'close') {
        this.scene.resume('MainScene');
        this.scene.resume('Dialog');
        const main: any = this.scene.get('MainScene');
        main.endMenu();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {
      this.menuIndex += 1;
      if (this.menuIndex > this.menuItems.length - 1) {
        this.menuIndex = 0;
      } else if (this.menuIndex < 0) {
        this.menuIndex = this.menuItems.length - 1;
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {
      this.menuIndex -= 1;
      if (this.menuIndex > this.menuItems.length - 1) {
        this.menuIndex = 0;
      } else if (this.menuIndex < 0) {
        this.menuIndex = this.menuItems.length - 1;
      }
    }
  }
}

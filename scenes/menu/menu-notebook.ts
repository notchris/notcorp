
export default class MenuNotebook extends Phaser.Scene {
  keyEnter: Phaser.Input.Keyboard.Key;
  keyUp: Phaser.Input.Keyboard.Key;
  keyDown: Phaser.Input.Keyboard.Key;
  menuIndex: number;
  menuItems: Array<any>;
  menuObjects: Array<any>;
  constructor() {
    super({
      key: 'MenuNotebook',
    });

    this.keyEnter = null;
    this.keyUp = null;
    this.keyDown = null;
  }

  preload(): void {
    this.load.spritesheet('patterns', '../assets/ui/patterns.png',
      {
        frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0,
      });
  }

  create(): void {
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    /** Menu panel outer border */
    const menuPanel = this.add.graphics();
    menuPanel.fillStyle(0x4aa3e4, 1);
    menuPanel.fillRoundedRect(10, 60, 230, 300, 2);
    menuPanel.lineStyle(2, 0x000000, 1);
    menuPanel.strokeRoundedRect(10, 60, 230, 300, 2);

    /** Menu panel pattern image fill */
    const imageMenu = this.add.tileSprite(10, 60, 230, 300, 'patterns', 2);
    imageMenu.setOrigin(0);
    imageMenu.setTileScale(3, 3);
    imageMenu.alpha = 0.5;

    /** Menu panel inner */
    const menuPanelB = this.add.graphics();
    menuPanelB.fillStyle(0xEEEEEE, 1);
    menuPanelB.fillRoundedRect(15, 65, 220, 290, 2);
    menuPanelB.lineStyle(1, 0x000000, 1);
    menuPanelB.strokeRoundedRect(15, 65, 220, 290, 2);

    /** Menu panel title background image fill */
    const imageTitle = this.add.tileSprite(15, 65, 220, 22, 'patterns', 4);
    imageTitle.setOrigin(0);
    imageTitle.setTileScale(3, 3);
    imageTitle.alpha = 0.1;

    /** Menu panel title background bottom stroke */
    const imageTitleStroke = this.add.graphics();
    imageTitleStroke.fillStyle(0xCCCCCC, 1);
    imageTitleStroke.fillRect(16, 86, 218, 2);

    /** Menu title text */
    this.add.text(22, 67, 'Notebook', { fontFamily: 'Visitor TT1 BRK', fontSize: 20, color: '#333333' });
  }

  update(): void {
    // Todo
  }
}

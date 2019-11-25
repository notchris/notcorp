
export default class MenuStatus extends Phaser.Scene {
  keyEnter: Phaser.Input.Keyboard.Key;
  keyUp: Phaser.Input.Keyboard.Key;
  keyDown: Phaser.Input.Keyboard.Key;
  menuIndex: number;
  menuItems: Array<any>;
  menuObjects: Array<any>;
  constructor() {
    super({
      key: 'MenuStatus',
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
    this.add.text(22, 67, 'Status', { fontFamily: 'Bree Serif', fontSize: 20, color: '#333333' });

    /** Player image */
    const imagePlayer = this.add.tileSprite(22, 76, 50, 90, 'player', 0);
    imagePlayer.setOrigin(0);
    imagePlayer.setTileScale(3, 3);

    /** Player details */
    /**
     * TODO: Implement real date from stored player data
     */
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = `${month}/${day}/${year}`;

    (this.add as any).rexBBCodeText(80, 100, 'Name: [color=#015296]notchris[/color]', { fontFamily: 'Bree Serif', fontSize: 14, color: '#333333' });
    (this.add as any).rexBBCodeText(80, 120, `Start: [color=#015296]${newdate}[/color]`, { fontFamily: 'Bree Serif', fontSize: 14, color: '#333333' });
    (this.add as any).rexBBCodeText(80, 140, 'ID#: [color=#015296]1[/color]', { fontFamily: 'Bree Serif', fontSize: 14, color: '#333333' });
    (this.add as any).rexBBCodeText(80, 160, 'Level: [color=#015296]1[/color]', { fontFamily: 'Bree Serif', fontSize: 14, color: '#333333' });

    /** EXP Container */
    this.add.text(26, 189, 'EXP', { fontFamily: 'Bree Serif', fontSize: 14, color: '#333333' });
    const expBarBg = this.add.graphics();
    expBarBg.fillStyle(0x333333, 1);
    expBarBg.fillRoundedRect(60, 190, 165, 12, 2);
    const expBar = this.add.graphics();
    expBar.fillStyle(0x007fea, 1);
    expBar.fillRoundedRect(60, 190, 122, 12, 2);
    const expBarPattern = this.add.tileSprite(60, 190, 122, 12, 'patterns', 4);
    expBarPattern.setOrigin(0);
    expBarPattern.setTileScale(2, 2);
    expBarPattern.alpha = 0.4;
    const expBarStroke = this.add.graphics();
    expBarStroke.lineStyle(2, 0x000000, 1);
    expBarStroke.strokeRoundedRect(60, 190, 165, 12, 2);

    /** HP Container */
    this.add.text(26, 209, 'HP', { fontFamily: 'Bree Serif', fontSize: 14, color: '#333333' });
    const hpBarBg = this.add.graphics();
    hpBarBg.fillStyle(0x333333, 1);
    hpBarBg.fillRoundedRect(60, 210, 165, 12, 2);
    const hpBar = this.add.graphics();
    hpBar.fillStyle(0xea4e50, 1);
    hpBar.fillRoundedRect(60, 210, 160, 12, 2);
    const hpBarPattern = this.add.tileSprite(60, 210, 160, 12, 'patterns', 4);
    hpBarPattern.setOrigin(0);
    hpBarPattern.setTileScale(2, 2);
    hpBarPattern.alpha = 0.4;
    const hpBarStroke = this.add.graphics();
    hpBarStroke.lineStyle(2, 0x000000, 1);
    hpBarStroke.strokeRoundedRect(60, 210, 165, 12, 2);
  }

  update(): void {
    // Todo
  }
}

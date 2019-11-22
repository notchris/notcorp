
interface GameObjectFactory {
  rexBBCodeText: any;
}

export default class Choice extends Phaser.Scene {
  public prompt: string;
  public promptText: any;
  public choices: Array<any>;
  public choiceObjects: Array<Phaser.GameObjects.Text>;
  public choiceIndicator: Phaser.GameObjects.Text;
  public choiceBox: Phaser.GameObjects.Graphics;
  public choiceBoxBorder: Phaser.GameObjects.TileSprite;
  public speed: number;
  public waiting: boolean;
  public index: number;
  keyE: Phaser.Input.Keyboard.Key;
  keyUp: Phaser.Input.Keyboard.Key;
  keyDown: Phaser.Input.Keyboard.Key;
  constructor(prompt: string, choices: Array<Phaser.GameObjects.Text>) {
    super({
      key: 'Choice',
    });
    this.prompt = prompt;
    this.promptText = {
      typing: null,
    };
    this.choices = choices;
    this.choiceObjects = [];
    this.choiceIndicator = null;
    this.choiceBox = null;
    this.choiceBoxBorder = null;
    this.speed = 80;
    this.waiting = false;
    this.keyE = null;
    this.keyUp = null;
    this.keyDown = null;
    this.index = 0;
  }

  preload(): void {
    // console.log('preload requires implementation');
  }

  create(): void {
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    /** Dialog box background */
    const dialogBox = this.add.graphics();
    dialogBox.fillStyle(0x333333, 1);
    dialogBox.fillRect(0, 310, 400, 90);
    const dialogBorder = this.add.tileSprite(0, 310, 400, 90, 'dialogPatterns', 2);
    dialogBorder.setOrigin(0);
    dialogBorder.setTileScale(3, 3);
    dialogBorder.alpha = 0.5;
    // dialogBox.lineStyle(2, 0xffffff, 1);
    // dialogBox.strokeRect(0, 310, 400, 90);

    /** Dialog top divider */
    const dialogLine = this.add.graphics();
    dialogLine.fillStyle(0x666666, 1);
    dialogLine.fillRect(0, 308, 400, 2);

    /** Choice box background */
    this.choiceBox = this.add.graphics();
    this.choiceBox.fillStyle(0x333333, 1);
    this.choiceBox.fillRect(230, 136, 160, 160);
    this.choiceBox.lineStyle(2, 0x666666, 1);
    this.choiceBox.strokeRect(230, 136, 160, 160);

    this.choiceBoxBorder = this.add.tileSprite(231, 137, 158, 157, 'dialogPatterns', 2);
    this.choiceBoxBorder.setOrigin(0);
    this.choiceBoxBorder.setTileScale(3, 3);
    this.choiceBoxBorder.alpha = 0.5;

    this.choiceIndicator = this.add.text(228, 0, '⇨', { fontFamily: 'Varela Round', fontSize: 15, color: '#73c08c' });

    this.choiceBox.setVisible(false);
    this.choiceBoxBorder.setVisible(false);
    this.choiceIndicator.setVisible(false);

    /** Choice Prompt text */
    this.promptText = (this.add as any).rexBBCodeText(20, 340, '', {
      fontFamily: 'Varela Round',
      fontSize: 16,
      color: '#ffffff',
    });
    this.promptText.typing = (this.plugins.get('rexTextTyping') as any).add(this.promptText, {
      speed: this.speed,
      setTextCallback: (text: string, isLastChar: boolean) => {
        if (isLastChar) {
          /** Choices Text */
          this.choices.forEach((choice, index) => {
            this.choiceObjects.push(this.add.text(260, 200 + (index * 20), choice.text, { fontFamily: 'Varela Round', fontSize: 15, color: '#ffffff' }));
          });
          this.waiting = true;
        }
        return text;
      },
    });
    this.promptText.typing.start(this.prompt);
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      if (!this.waiting) return;
      const parent: any = this.scene.get('IntroScene');
      const cb = this.choices[this.index].callback || null;
      parent.endChoice(cb);
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {
      if (!this.waiting) return;
      this.index += 1;
      if (this.index > this.choices.length - 1) {
        this.index = 0;
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {
      if (!this.waiting) return;
      this.index -= 1;
      if (this.index < 0) {
        this.index = this.choices.length - 1;
      }
    }

    if (this.waiting) {
      this.choiceBox.setVisible(true);
      this.choiceBoxBorder.setVisible(true);
      this.choiceIndicator.setVisible(true);
      this.choiceIndicator.setPosition(236, this.choiceObjects[this.index].y + 1, 0);
    }

    if (!this.waiting) return;
    for (let i = 0; i < this.choiceObjects.length; i += 1) {
      if (i === this.index) {
        this.choiceObjects[i].setColor('#73c08c');
      } else {
        this.choiceObjects[i].setColor('#FFFFFF');
      }
    }
  }
}

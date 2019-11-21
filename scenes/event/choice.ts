
interface GameObjectFactory {
  rexBBCodeText: any;
}

export default class Choice extends Phaser.Scene {
  public prompt: string;
  public promptText: any;
  public choices: Array<any>;
  public choiceObjects: Array<Phaser.GameObjects.Text>;
  public choiceIndicator: Phaser.GameObjects.Text;
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
    this.speed = 100;
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

    /** Choice box background */
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 310, 400, 90);

    this.choiceIndicator = this.add.text(8, 0, '>', { fontFamily: 'Visitor TT1 BRK', fontSize: 15, color: '#ff0000' });
    this.choiceIndicator.setVisible(false);

    /** Choice Prompt text */
    this.promptText = (this.add as any).rexBBCodeText(20, 340, '', { fontFamily: 'Visitor TT1 BRK', fontSize: 15, color: '#ffffff' });
    this.promptText.typing = (this.plugins.get('rexTextTyping') as any).add(this.promptText, {
      speed: this.speed,
      setTextCallback: (text: string, isLastChar: boolean) => {
        if (isLastChar) {
          /** Choices Text */
          this.choices.forEach((choice, index) => {
            this.choiceObjects.push(this.add.text(20, 200 + (index * 20), choice.text, { fontFamily: 'Visitor TT1 BRK', fontSize: 15, color: '#ffffff' }));
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
      this.choiceIndicator.setVisible(true);
      this.choiceIndicator.setPosition(8, this.choiceObjects[this.index].y + 1, 0);
    }

    if (!this.waiting) return;
    for (let i = 0; i < this.choiceObjects.length; i += 1) {
      if (i === this.index) {
        this.choiceObjects[i].setColor('#FF0000');
      } else {
        this.choiceObjects[i].setColor('#FFFFFF');
      }
    }
  }
}

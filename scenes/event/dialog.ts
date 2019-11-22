
interface GameObjectFactory {
  rexBBCodeText: any;
}

export default class Dialog extends Phaser.Scene {
  public dialog: string[][];
  public text: any;
  public indicatorText: Phaser.GameObjects.Text;
  public indicatorTextTween: Phaser.Tweens.Tween;
  public speed: number;
  public waiting: boolean;
  public index: number;
  public callback: number;
  keyE: Phaser.Input.Keyboard.Key;
  constructor(dialog: string[][], callback?: number) {
    super({
      key: 'Dialog',
    });
    this.dialog = dialog;
    this.text = {
      typing: null,
    };
    this.indicatorText = null;
    this.indicatorTextTween = null;
    this.speed = 80;
    this.waiting = false;
    this.keyE = null;
    this.index = 0;
    this.callback = callback || null;
  }

  preload(): void {
    this.load.spritesheet('dialogPatterns', '../assets/ui/patterns.png',
      {
        frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0,
      });
  }

  create(): void {
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

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

    /** Dialog text */
    this.text = (this.add as any).rexBBCodeText(20, 340, '', {
      fontFamily: 'Varela Round',
      fontSize: 16,
      color: '#ffffff',
    });
    this.text.typing = (this.plugins.get('rexTextTyping') as any).add(this.text, {
      speed: this.speed,
      setTextCallback: (text: string, isLastChar: boolean) => {
        if (isLastChar) {
          this.waiting = true;
        }
        return text;
      },
    });
    this.text.typing.start(this.dialog[this.index]);
    // Indicator Text
    this.indicatorText = this.add.text(374, 371, 'E', { fontFamily: 'Varela Round', fontSize: 16, color: '#ffffff' });
    // Flashing E indicator
    this.indicatorTextTween = this.tweens.add({
      targets: this.indicatorText,
      duration: 500,
      ease: 'Sine.easeInOut',
      delay: 0,
      alpha: {
        getStart: (): number => 1,
        getEnd: (): number => 0,
      },
      yoyo: true,
      repeat: -1,
    });
  }

  update(): void {
    if (this.waiting) {
      this.indicatorText.setVisible(true);
      this.indicatorTextTween.resume();
    } else {
      this.indicatorText.setVisible(false);
      this.indicatorTextTween.pause();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      if (!this.waiting) return;
      if (this.index < this.dialog.length - 1) {
        this.waiting = false;
        this.index += 1;
        this.text.typing.start(this.dialog[this.index]);
      } else {
        this.index = 0;
        this.waiting = false;
        const parent: any = this.scene.get('IntroScene');
        parent.endDialog(this.callback);
      }
    }
  }
}

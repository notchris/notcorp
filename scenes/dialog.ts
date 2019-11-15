import Player from '../classes/Player';
import Controls from '../util/Controls';

interface GameObjectFactory {
  rexBBCodeText: any;
}

export default class Dialog extends Phaser.Scene {
  public testString: string;
  public text: any;
  public speed: number;
  public waiting: boolean;
  constructor(testString: string) {
    super({
      key: "Dialog"
    });
    this.testString = testString;
    this.text = {
      typing: null
    };
    this.speed = 20;
    this.waiting = false;
  }

  preload(): void {

  }

  create(): void {
    /** Dialog box background */
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 310, 400, 90);

    /** Dialog text */
    this.text = (<any>this.add).rexBBCodeText(20, 340, '', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
    this.text.typing = (<any>this.plugins.get('rexTextTyping')).add(this.text, {
        speed: this.speed,
        setTextCallback:(text, isLastChar) => {
            if (isLastChar) {
                this.waiting = true;
            }
            return text;
        } 
    });
    this.text.typing.start(this.testString);

  }

  update(): void {
  }
}

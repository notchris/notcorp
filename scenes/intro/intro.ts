import Dialog from '../event/dialog';
import Choice from '../event/choice';
import Cutscene from '../event/cutscene';
import EditCharacter from '../event/editcharacter';

import * as eventList from './events.json';

export default class IntroScene extends Phaser.Scene {
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public eventList: Array<any>;
  public test: any;
  constructor() {
    super({
      key: 'IntroScene',
    });
    this.eventList = eventList;
    this.test = null;
  }

  preload(): void {
    // preload
  }

  create(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x22657f, 1);
    graphics.fillRect(0, 0, 4, 4);
    graphics.generateTexture('rain', 4, 4);
    const particles = this.add.particles('rain', 0, [{
      x: {
        min: 0,
        max: 400,
      },
      y: 0,
      frequency: 100,
      speedY: { min: 80, max: 120 },
      lifespan: 50000,
      scale: {
        min: 0.2,
        max: 0.5,
      },
    }]);

    this.callEvent(1);
  }

  callEvent(id: number): void {
    const ev = this.eventList.filter((event) => event.id === id)[0];
    switch (ev.type) {
      case 'dialog':
        this.scene.add('Dialog', new Dialog(ev.data, ev.callback ? ev.callback : null), true, {});
        break;
      case 'choice':
        this.scene.add('Choice', new Choice(ev.prompt, ev.data), true, {});
        break;
      case 'cutscene':
        this.scene.add('Cutscene', new Cutscene(ev.scene, ev.callback), true, {});
        break;
      case 'editcharacter':
        this.scene.add('EditCharacter', EditCharacter, true, {});
        break;
      case 'startGame':
        this.scene.remove('EditCharacter');
        this.scene.start('MainScene');
        break;
      default:
        break;
    }
  }

  endDialog(callback?: number): void {
    this.scene.remove('Dialog');
    if (callback) {
      this.time.delayedCall(500, () => {
        this.callEvent(callback);
      }, [], this);
    }
  }

  endChoice(callback?: number): void {
    this.scene.remove('Choice');
    if (callback) {
      this.time.delayedCall(500, () => {
        this.callEvent(callback);
      }, [], this);
    }
  }

  endCutscene(callback?: number): void {
    this.scene.remove('Cutscene');
    if (callback) {
      this.time.delayedCall(500, () => {
        this.callEvent(callback);
      }, [], this);
    }
  }

  update(): void {
    // update
  }
}

import Dialog from '../event/dialog';
import Choice from '../event/choice';

import * as eventList from './events.json';

export default class IntroScene extends Phaser.Scene {
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public eventList: Array<any>;
  constructor() {
    super({
      key: 'IntroScene',
    });
    this.eventList = eventList;
  }

  preload(): void {
    // preload
  }

  create(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillRect(40, 40, 40, 40);

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

  update(): void {
    // update
  }
}

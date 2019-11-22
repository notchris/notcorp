
export default class Cutscene extends Phaser.Scene {
  public cutscene: number;
  public callback: Function;
  constructor(cutscene, callback?) {
    super({
      key: 'Cutscene',
    });
    this.cutscene = cutscene;
    this.callback = callback || null;
  }
  preload(): void {
    // console.log('preload requires implementation');
  }

  create(): void {
    this.add.text(0, 0, 'CUTSCENE', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
    this.time.delayedCall(2000, () => {
      this.endScene();
    }, [], this);
  }

  endScene(): void {
    const parent: any = this.scene.get('IntroScene');
    const cb = this.callback || null;
    parent.endCutscene(cb);
  }

  update(): void {
    // update
  }
}

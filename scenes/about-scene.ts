export default class AboutScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'AboutScene',
    });
  }

  preload(): void {
    this.load.html('about', '../assets/ui/about.html');
  }

  create(): void {
    const element = this.add.dom(0, 0).createFromCache('about');
    element.setOrigin(0);
    element.getChildByID('backButton').addEventListener('click', () => {
      this.goBack();
    });
  }

  goBack(): void {
    this.scene.start('StartScene');
  }

  update(): void {
    // Do something
  }
}

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'StartScene',
    });
  }

  preload(): void {
    this.load.spritesheet('patterns2', '../assets/ui/patterns.png',
      {
        frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0,
      });
    this.load.html('start', '../assets/ui/start.html');
  }

  create(): void {
    const element = this.add.dom(0, 0).createFromCache('start');
    element.setOrigin(0);
    element.getChildByID('loginButton').addEventListener('click', () => {
      this.login();
    });
    element.getChildByID('registerButton').addEventListener('click', () => {
      this.register();
    });
    element.getChildByID('aboutButton').addEventListener('click', () => {
      this.about();
    });
  }

  login(): void {
    this.scene.start('LoginScene');
  }

  register(): void {
    this.scene.start('RegisterScene');
  }

  about(): void {
    this.scene.start('AboutScene');
  }

  update(): void {
    // Do something
  }
}

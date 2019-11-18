export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LoginScene',
    });
  }

  preload(): void {
    this.load.html('login', '../assets/ui/login.html');
  }

  create(): void {
    const element = this.add.dom(0, 0).createFromCache('login');
    element.setOrigin(0);
    const loginForm = element.getChildByID('loginForm');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('ok');
    });
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

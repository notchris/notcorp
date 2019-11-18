export default class RegisterScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'RegisterScene',
    });
  }

  preload(): void {
    this.load.html('register', '../assets/ui/register.html');
  }

  create(): void {
    const element = this.add.dom(0, 0).createFromCache('register');
    element.setOrigin(0);
    const registerForm = element.getChildByID('registerForm');
    registerForm.addEventListener('submit', (e) => {
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

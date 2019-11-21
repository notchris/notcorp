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
      const usernameInput = (element.getChildByID('username') as any).value;
      const passwordInput = (element.getChildByID('password') as any).value;
      const message = element.getChildByID('message');

      if (passwordInput === '') {
        message.innerHTML = '<p>Invalid username or password.</p>';
        console.log('Invalid username or password.');
        return;
      }
      if (usernameInput === '') {
        message.innerHTML = '<p>Invalid username or password.</p>';
        console.log('Invalid username or password.');
        return;
      }

      fetch('https://notcorp.dev/login', {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((data) => {
        if (data.status === 'ok') {
          this.goBack();
        } else {
          message.innerHTML = '<p>Invalid username or password.</p>';
          console.log('Invalid username or password.');
        }
      }).catch((err) => {
        if (err) {
          message.innerHTML = '<p>Server error.</p>';
          console.log('Server error.');
        }
      });
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

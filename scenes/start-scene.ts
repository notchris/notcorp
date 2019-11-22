export default class StartScene extends Phaser.Scene {
  public loggedIn: boolean;
  private logoutButton: Element;
  private loginButton: Element;
  private registerButton: Element;
  private username: string;
  public statusMessage: Element;
  constructor() {
    super({
      key: 'StartScene',
    });
    this.loggedIn = false;
    this.logoutButton = null;
    this.loginButton = null;
    this.registerButton = null;
    this.statusMessage = null;
    this.username = null;
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

    this.statusMessage = element.getChildByID('status');

    this.loginButton = element.getChildByID('loginButton');
    this.loginButton.addEventListener('click', () => {
      this.login();
    });

    this.logoutButton = element.getChildByID('logoutButton');
    this.logoutButton.addEventListener('click', () => {
      this.logout();
    });

    this.registerButton = element.getChildByID('registerButton');
    this.registerButton.addEventListener('click', () => {
      this.register();
    });

    element.getChildByID('devButton').addEventListener('click', () => {
      this.dev();
    });

    fetch('https://notcorp.dev/status', {
      method: 'get',
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        throw new Error('WTF');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      if (data.status === 'ok') {
        this.loggedIn = true;
        this.username = data.username;
        this.statusMessage.innerHTML = `<p>Logged in as: ${this.username} </p>`;
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  login(): void {
    this.scene.start('LoginScene');
  }

  logout(): void {
    fetch('https://notcorp.dev/logout', {
      method: 'get',
      credentials: 'include',
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      if (data.status === 'ok') {
        this.statusMessage.innerHTML = '';
        this.loggedIn = false;
      }
    }).catch((err) => {
      console.warn(err);
    });
  }

  register(): void {
    this.scene.start('RegisterScene');
  }

  dev(): void {
    this.scene.start('IntroScene');
  }
  update(): void {
    if (this.loggedIn) {
      this.registerButton.classList.add('hidden');
      this.loginButton.classList.add('hidden');
      this.logoutButton.classList.remove('hidden');
    } else {
      this.registerButton.classList.remove('hidden');
      this.loginButton.classList.remove('hidden');
      this.logoutButton.classList.add('hidden');
    }
  }
}

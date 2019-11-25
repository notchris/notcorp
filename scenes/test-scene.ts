export default class TestListScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TestListScene',
    });
  }

  preload(): void {
    this.load.html('test', '../assets/ui/test.html');
  }

  create(): void {
    const element = this.add.dom(0, 0).createFromCache('test');
    element.setOrigin(0);

    const tests = element.getChildByID('tests');
    for (let i = 0; i < tests.children.length; i += 1) {
      const a = tests.children[i].querySelector('a');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.time.delayedCall(200, () => {
          this.scene.start(a.id, { title: a.innerText });
        }, [], this);
      });
    }
  }

  update(): void {
    // test
  }
}

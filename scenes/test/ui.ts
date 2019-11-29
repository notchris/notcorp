import Player from '../../classes/Player';

export default class TestUI extends Phaser.Scene {
  public testScene: Phaser.Scene;
  public player: Player;
  public playerInfo: Phaser.GameObjects.Text;
  public title: string;
  public testID: string;
  constructor(testScene, player, title, testID) {
    super({
      key: 'TestUI',
    });
    this.testScene = testScene;
    this.player = player;
    this.playerInfo = null;
    this.title = title;
    this.testID = testID;
  }

  preload(): void {
    // d
  }

  create(): void {
    const uiBox = this.add.graphics();
    uiBox.fillStyle(0x000000, 0.5);
    uiBox.fillRect(0, 0, 400, 40);
    this.playerInfo = this.add.text(12, 12, `Test: ${this.title}`, { fontFamily: 'Arial', fontSize: 14, color: '#FFFFFF' });
    const backButton = this.add.text(340, 12, 'Back', { fontFamily: 'Arial', fontSize: 14, color: '#73c08c' });
    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => {
      this.scene.remove('Menu');
      this.scene.remove('MenuStatus');
      this.scene.remove('MenuBackpack');
      this.scene.remove('MenuNotebook');
      this.scene.remove('MenuSettings');
      this.testScene.events.emit('back');
      this.scene.remove('TestUI');
    });
  }

  update(): void {
    // update
  }
}

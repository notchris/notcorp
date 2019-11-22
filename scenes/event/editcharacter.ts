
export default class EditCharacter extends Phaser.Scene {
  public characterTitle: Phaser.GameObjects.Text;
  constructor() {
    super({
      key: 'EditCharacter',
    });
    this.characterTitle = null;
  }
  preload(): void {
    this.load.spritesheet('character', '../assets/character/player.png',
      {
        frameWidth: 16, frameHeight: 32, margin: 0, spacing: 0,
      });
  }

  create(): void {
    const imageCharacter = this.add.sprite(150, 100, 'character');
    imageCharacter.setOrigin(0);
    this.tweens.add({
      targets: imageCharacter,
      duration: 500,
      ease: 'Sine.easeInOut',
      delay: 0,
      scale: {
        getStart: (): number => 3,
        getEnd: (): number => 6,
      },
      yoyo: false,
      repeat: 0,
    });
    const parent: any = this.scene.get('IntroScene');
    parent.callEvent(9);
  }

  update(): void {
    // update
  }
}

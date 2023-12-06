import 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  playerSpeed: number;
  key: string;

  constructor(params) {
    super(params.scene, params.x, params.y, params.texture, params.frame);
    this.playerSpeed = 300;
    this.key = params.key;
  }

  init(): void {
    // physics
    this.scene.physics.world.enable(this);

    this.body
      .setSize(24, 40)
      .setOffset(0, 24);

    this.displayOriginX = 0.5;
    this.displayOriginY = 0.5;

    this.setScale(1, 1);
    this.body.setCollideWorldBounds(true);
    this.scene.add.existing(this);
  }


  moveUp(): void {
    this.setFrame(1)
    this.body.setVelocityY(-this.playerSpeed);
  }

  moveDown(): void {
    this.setFrame(0)
    this.body.setVelocityY(this.playerSpeed);
  }

  moveLeft(): void {
    this.setFrame(2)
    this.body.setVelocityX(-this.playerSpeed);
  }

  moveRight(): void {
    this.setFrame(3)
    this.body.setVelocityX(this.playerSpeed);
  }

  stand(): void {
    this.body.setVelocity(0);
  }
}
import { GameScene } from "./main";
import * as Phaser from "phaser";

export class Player {
  constructor( private sprite: Phaser.GameObjects.Sprite,
    private tilePos: Phaser.Math.Vector2) {
    const offsetX = GameScene.TILE_SIZE / 2;
    const offsetY = GameScene.TILE_SIZE;

    // sprite.setPosition(
    //     tilePos.x * GameScene.TILE_SIZE + offsetX,
    //     tilePos.y * GameScene.TILE_SIZE + offsetY
    // );
    sprite.setFrame(3);
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getBottomCenter();
  }

  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y);
  }
}
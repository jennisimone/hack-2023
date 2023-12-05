import * as Phaser from "phaser";
import { Player } from "./player";
import { GridControls } from "./gridControls";
import { GridPhysics } from "./gridPhysics";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 640;

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  static readonly TILE_SIZE = 16;

  private gridControls: GridControls;
  private gridPhysics: GridPhysics;

  public preload() {
    this.load.image("interior-tiles", "assets/office-interior.png");
    this.load.tilemapTiledJSON("background", "assets/floor-four.json");
    this.load.spritesheet("player", "assets/santa32x32.png", {
      frameWidth: 32,
      frameHeight: 64
    });
  }

  public create() {
    const autoTraderTilemap = this.make.tilemap({ key: "background" });
    autoTraderTilemap.addTilesetImage("Background", "interior-tiles");
    autoTraderTilemap.createLayer("Tile Layer 1", "Cloud City", 0, 0);

    const playerSprite = this.add.sprite(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      "player"
    );

    playerSprite.setDepth(2);
    playerSprite.scale = 1;
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.setBounds(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.cameras.main.roundPixels = true;
    const player = new Player(playerSprite, new Phaser.Math.Vector2());

    this.gridPhysics = new GridPhysics(player);
    this.gridControls = new GridControls(
      this.input,
      this.gridPhysics
    );

  }

  public update(_time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "NomNom Dash",
  type: Phaser.AUTO,
  render: {
    antialias: false,
  },
  parent: "game",
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: GameScene,
};

export const game = new Phaser.Game(gameConfig);

import * as Phaser from "phaser";

const sceneConfig = {
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

  static TILE_SIZE = 48;

  preload() {
    this.load.image("interior-tiles", "assets/office-interior.png");
    this.load.tilemapTiledJSON("background", "assets/floor-four.json");
  }

  create() {
    this.map = this.make.tilemap({ key: "background" });
    const tileset = this.map.addTilesetImage("Background", "interior-tiles");
    this.layer = this.map.createLayer("Tile Layer 1", tileset, 0, 0);
  }

  update() {}
}

const gameConfig = {
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

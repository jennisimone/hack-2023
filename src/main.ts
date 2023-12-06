import * as Phaser from "phaser";
import { Player } from "./player";
import { GridControls } from "./gridControls";
import { GridPhysics } from "./gridPhysics";
import TiledObject = Phaser.Types.Tilemaps.TiledObject

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
  private currentlyAlerting = false;

  public preload() {
    this.load.image("interior-tiles", "assets/office-interior.png");
    this.load.image("interior-props", "assets/office-objects.png");
    this.load.tilemapTiledJSON("floor4", "assets/floor4.json");
    this.load.tilemapTiledJSON("floor5", "assets/floor5.json");
    this.load.tilemapTiledJSON("floor6", "assets/floor6.json");
    this.load.spritesheet("Donuts", "assets/donuts.png", {frameHeight: 32, frameWidth: 32})
    this.load.spritesheet("Kebabs", "assets/kebabs.png", {frameHeight: 32, frameWidth: 32})
    this.load.spritesheet("Pizza", "assets/pizza.png", {frameHeight: 32, frameWidth: 32})

    this.load.spritesheet("player", "assets/santa32x32.png", {
      frameWidth: 32,
      frameHeight: 64
    });
  }

  public create() {
    const map = this.make.tilemap({ key: "floor4" });
    const interiorTileset = map.addTilesetImage("OfficeInterior", "interior-tiles");
    const objectTileset = map.addTilesetImage("office-props", "interior-props");
    const floorLayer = map.createLayer("Floor", interiorTileset, 0, 0);
    const wallLayer = map.createLayer("Walls", interiorTileset, 0, 0);
    const propsLayer = map.createLayer("Props", objectTileset, 0, 0);
    const rooms = map.getObjectLayer("Room").objects;
    const stairs = map.getObjectLayer("Stairs").objects;

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
    this.alertTime(rooms)
  }

  public update(_time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
  }

  alertTime(rooms: TiledObject[]) {
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    const foods = ["Donuts", "Kebabs", "Pizza"]
    let currentFood

    const alertText = this.add.text(480,20,'').setOrigin(0.5);
    const randomFood = foods[Math.floor(Math.random() * foods.length)];

    const timer = this.add.timeline([{
      at: 500,                // ms
      run: () => {
        alertText.setText(`Food alert! ${randomFood} outside ${randomRoom.name}`)
        currentFood = this.add.sprite(randomRoom.x, randomRoom.y, randomFood)
        this.currentlyAlerting = true
      },
    },{
      at: 10000,                // ms
      run: () => {
        alertText.setText('')
      },
    }]);

    if (this.currentlyAlerting === false) {
      timer.play()
    }
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

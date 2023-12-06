import * as Phaser from "phaser";
import { Player } from "./Player";
import TiledObject = Phaser.Types.Tilemaps.TiledObject
import TilemapLayer = Phaser.Tilemaps.TilemapLayer
import Camera = Phaser.Cameras.Scene2D.Camera

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: "Game",
};

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 960;

export class GameScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    static readonly TILE_SIZE = 16;

    private currentlyAlerting = false;
    private collidingLayers: TilemapLayer[] = [];
    private player: Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

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

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    public create() {
        const map = this.make.tilemap({key: "floor4"});
        const interiorTileset = map.addTilesetImage("OfficeInterior", "interior-tiles");
        const objectTileset = map.addTilesetImage("office-props", "interior-props");
        const floorLayer = map.createLayer("Floor", interiorTileset, 0, 0);
        const wallLayer = map.createLayer("Walls", interiorTileset, 0, 0);
        const propsLayer = map.createLayer("Props", objectTileset, 0, 0);
        const rooms = map.getObjectLayer("Room").objects;
        const stairs = map.getObjectLayer("Stairs").objects;

        this.physics.world.setBounds(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        this.collidingLayers.push(wallLayer, propsLayer)

        this.player = new Player({
            scene: this,
            x: 400,
            y: 200,
            texture: "player"
        });
        this.player.init()

        this.cameras.main.setBounds(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT/2)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.alertTime(rooms)

        this.physics.world.enable(this.player);
        this.physics.world.gravity.y = 0
        this.physics.world.fixedStep = false
        this.physics.add.collider(this.player, floorLayer);
        this.collidingLayers.forEach((layer) => {
            this.physics.add.collider(this.player, layer);
            layer.setCollisionByProperty({collides: true})
        });
    }

    public update(_time: number, delta: number) {
        if (this.player != undefined) {
            if (this.cursors.left.isDown) {
                this.player.moveLeft();
            } else if (this.cursors.right.isDown) {
                this.player.moveRight();
            } else if (this.cursors.down.isDown) {
                this.player.moveDown();
            } else if (this.cursors.up.isDown) {
                this.player.moveUp();
            } else {
                this.player.stand();
                this.player.anims.stop();
            }
        }
    }

    alertTime(rooms: TiledObject[]) {
        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        const foods = ["Donuts", "Kebabs", "Pizza"]
        let currentFood

        const alertText = this.add.text(480, 20, '').setOrigin(0.5);
        const randomFood = foods[Math.floor(Math.random() * foods.length)];

        const timer = this.add.timeline([{
            at: 500,                // ms
            run: () => {
                alertText.setText(`Food alert! ${randomFood} outside ${randomRoom.name}`)
                currentFood = this.add.sprite(randomRoom.x, randomRoom.y, randomFood)
                this.currentlyAlerting = true
            },
        }, {
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
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
        },
    },
    scale: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: GameScene,
};

export const game = new Phaser.Game(gameConfig);

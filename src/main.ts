import * as Phaser from "phaser";
import { Player } from "./Player";
import TiledObject = Phaser.Types.Tilemaps.TiledObject
import TilemapLayer = Phaser.Tilemaps.TilemapLayer
import Home from './home'
import Win from './win'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: "Game",
};

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 960;

export class GameScene extends Phaser.Scene {
    private alertText: Phaser.GameObjects.Text
    constructor() {
        super(sceneConfig);
    }

    static readonly TILE_SIZE = 16;

    currentFood: Phaser.GameObjects.Sprite;
    rooms: TiledObject[] = []
    private currentlyAlerting = false;
    private player1Score = 0;
    private player2Score = 0;
    private collidingLayers: TilemapLayer[] = [];
    private player: Player;
    private playerTwo: Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    music: Phaser.Sound.BaseSound;

    public preload() {
        this.loadImages()
        this.loadTilemaps()
        this.loadAudio()

        this.cursors = this.input.keyboard.createCursorKeys();

        this.loadAudio()
    }

    public create() {
        const floorLayer = this.createTilemaps()

        this.physics.world.setBounds(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.setupPlayerOne()
        this.setupPlayerTwo()
        this.setupPhysics(floorLayer)
        this.setupAudio()
        this.alertTime()
    }

    public update(_time: number, delta: number) {

        if (this.player != undefined) {
            if (this.input.keyboard.addKey('A').isDown) {
                this.player.moveLeft();
            } else if (this.input.keyboard.addKey('D').isDown) {
                this.player.moveRight();
            } else if (this.input.keyboard.addKey('S').isDown) {
                this.player.moveDown();
            } else if (this.input.keyboard.addKey('W').isDown) {
                this.player.moveUp();
            } else {
                this.player.stand();
                this.player.anims.stop();
            }
        }
        if (this.playerTwo != undefined) {
            if (this.cursors.left.isDown) {
                this.playerTwo.moveLeft();
            } else if (this.cursors.right.isDown) {
                this.playerTwo.moveRight();
            } else if (this.cursors.down.isDown) {
                this.playerTwo.moveDown();
            } else if (this.cursors.up.isDown) {
                this.playerTwo.moveUp();
            } else {
                this.playerTwo.stand();
                this.playerTwo.anims.stop();
            }
        }
    }

    private setupPlayerOne() {
        this.player = new Player({
            scene: this,
            x: 400,
            y: 200,
            texture: "player",
        });
        this.player.init();
        this.cameras.main.setSize(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
        this.cameras.main.setBounds(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
    }

    private setupPlayerTwo() {
        this.playerTwo = new Player({
            scene: this,
            x: 450,
            y: 200,
            texture: "playerTwo"
        });
        this.playerTwo.init()
        let playerTwoCamera = this.cameras.add((CANVAS_WIDTH / 2) + 1, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT)
        playerTwoCamera.setBounds(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        playerTwoCamera.startFollow(this.playerTwo);
        playerTwoCamera.roundPixels = true;
    }

    private setupPhysics(floorLayer: Phaser.Tilemaps.TilemapLayer) {
        this.physics.world.enable(this.player);
        this.physics.world.gravity.y = 0
        this.physics.world.fixedStep = false

        this.physics.add.collider(this.player, floorLayer);
        this.physics.add.collider(this.playerTwo, floorLayer);

        this.collidingLayers.forEach((layer) => {
            layer.setCollisionByProperty({collides: true})
            this.physics.add.collider(this.player, layer);
        });
        this.collidingLayers.forEach((layer) => {
            layer.setCollisionByProperty({collides: true})
            this.physics.add.collider(this.playerTwo, layer);
        });
    }

    private setupAudio() {
        if (!this.music) {
            this.music =
                this.sound.add("music", {loop: true, volume: 0.1})
            this.sound.add('eating', {loop: false, volume: 0.2})
        }
        if (!this.music.isPlaying) {
            this.music.play();
        }
    }

    private playEatingSfx(): void {
        this.sound.play("eating")
    }

    eatFood(player: string) {
        if (player === "1") {
            this.player1Score++
        }
        if (player === "2") {
            this.player2Score++
        }

        this.currentFood.destroy()

        this.playEatingSfx()

        if(this.player1Score + this.player2Score === 15) {
            this.scene.start("win", {player1Score: this.player1Score, player2Score: this.player2Score})
        }

        this.currentlyAlerting = false
        this.alertText.setText("")
        this.alertTime()
    };

    alertTime() {
        const randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        const foods = ["Donuts", "Kebabs", "Pizza"];

        this.alertText = this.add.text(240, 20, "", {color: "black", backgroundColor: "white"}).setOrigin(0.5).setScrollFactor(0);
        const randomFood = foods[Math.floor(Math.random() * foods.length)];

        const timer = this.add.timeline([
            {
                at: 500, // ms
                run: () => {
                    this.alertText.setText(
                        `Food alert! ${randomFood} outside ${randomRoom.name}`
                    );
                    this.currentFood = this.add.sprite(randomRoom.x, randomRoom.y, randomFood);
                    this.physics.world.enableBody(this.currentFood)

                    this.physics.add.collider(this.player, this.currentFood, () => this.eatFood("1"), null, this)
                    this.physics.add.collider(this.playerTwo, this.currentFood, () => this.eatFood("2"), null, this)

                    this.currentlyAlerting = true;
                },
            },
            {
                at: 10000, // ms
                run: () => {
                    this.alertText.setText("");
                },
            },
        ]);

        if (this.currentlyAlerting === false) {
            timer.play();
        }
    }

    private createTilemaps() {
        const map = this.make.tilemap({key: "floor4"});
        const interiorTileset = map.addTilesetImage("OfficeInterior", "interior-tiles");
        const objectTileset = map.addTilesetImage("office-props", "interior-props");
        const floorLayer = map.createLayer("Floor", interiorTileset, 0, 0);
        const wallLayer = map.createLayer("Walls", interiorTileset, 0, 0);
        const propsLayer = map.createLayer("Props", objectTileset, 0, 0);
        this.rooms = map.getObjectLayer("Room").objects;
        const stairs = map.getObjectLayer("Stairs").objects;

        wallLayer.setCollisionByExclusion([-1], true)
        propsLayer.setCollisionByExclusion([-1], true)
        this.collidingLayers.push(wallLayer, propsLayer)
        return floorLayer
    }

    private loadTilemaps() {
        this.load.tilemapTiledJSON("floor4", "assets/floor4.json");
        this.load.tilemapTiledJSON("floor5", "assets/floor5.json");
        this.load.tilemapTiledJSON("floor6", "assets/floor6.json");
    }

    private loadImages() {
        this.load.image("interior-tiles", "assets/office-interior.png");
        this.load.image("interior-props", "assets/office-objects.png");
        this.load.spritesheet("Donuts", "assets/donuts.png", {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet("Kebabs", "assets/kebabs.png", {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet("Pizza", "assets/pizza.png", {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet("player", "assets/santa32x32.png", {
            frameWidth: 32,
            frameHeight: 64
        });
        this.load.spritesheet("playerTwo", "assets/witch.png", {
            frameWidth: 32,
            frameHeight: 64
        });
    }

    private loadAudio() {
        this.load.audio("music", "assets/Hack-2023.wav")
        this.load.audio('eating', 'assets/eating.mp3');
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
        default: "arcade",
        arcade: {
            gravity: {y: 0},
        },
    },
    scale: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Home, GameScene, Win],
};

export const game = new Phaser.Game(gameConfig);

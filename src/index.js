import Phaser from 'phaser';

class MyGame extends Phaser.Scene
{
    currentlyAlerting = false;
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image("interior-tiles", "assets/office-interior.png");
        this.load.image("interior-props", "assets/office-objects.png");
        this.load.tilemapTiledJSON("floor4", "assets/floor4.json");
        this.load.tilemapTiledJSON("floor5", "assets/floor5.json");
        this.load.tilemapTiledJSON("floor6", "assets/floor6.json");
        this.load.spritesheet("Donuts", "assets/donuts.png", {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet("Kebabs", "assets/kebabs.png", {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet("Pizza", "assets/pizza.png", {frameHeight: 32, frameWidth: 32})
    }
      
    create ()
    {
        this.map = this.make.tilemap({key: "floor4"});
        const interiorTileset = this.map.addTilesetImage("OfficeInterior", "interior-tiles");
        const objectTileset = this.map.addTilesetImage("office-props", "interior-props");
        const floorLayer = this.map.createLayer("Floor", interiorTileset, 0, 0);
        const wallLayer = this.map.createLayer("Walls", interiorTileset, 0, 0);
        const propsLayer = this.map.createLayer("Props", objectTileset, 0, 0);
        const rooms = this.map.getObjectLayer("Room").objects;
        const stairs = this.map.getObjectLayer("Stairs").objects;
        this.alertTime(rooms)
    }

    alertTime(rooms) {
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

    eatFood(player, food) {
        food.destroy(true);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',

    scene: MyGame,
    scale: {
        mode: Phaser.Scale.FIT,
        width: '120%',
        height: '120%',


    }
};

const game = new Phaser.Game(config);

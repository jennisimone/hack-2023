import Phaser from 'phaser';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image("interior-tiles", "assets/office-interior.png");
        this.load.tilemapTiledJSON("background", "assets/floor-four.json");
        this.load.spritesheet("Donuts", "assets/donuts.png", {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet("Kebabs", "assets/kebabs.png", {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet("Pizza", "assets/pizza.png", {frameHeight: 32, frameWidth: 32})
    }
      
    create ()
    {
        this.map = this.make.tilemap({key: "background"});
        const tileset = this.map.addTilesetImage("Background", "interior-tiles");
        this.layer = this.map.createLayer("Tile Layer 1", tileset, 0, 0);
        const rooms = this.map.getObjectLayer("room").objects;
        this.alertTime(rooms)
    }


    alertTime(rooms) {
        let randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        const foods = ["Donuts", "Kebabs", "Pizza"]

        const alertText = this.add.text(480,20,'').setOrigin(0.5);
        let randomFood = foods[Math.floor(Math.random() * foods.length)];

        const timer = this.add.timeline([{
            at: 500,                // ms
            run: () => {
                alertText.setText(`Food alert! ${randomFood} outside ${randomRoom.name}`)
                this.add.sprite(randomRoom.x, randomRoom.y, randomFood)
            },
        },{
            at: 10000,                // ms
            run: () => {
                alertText.setText('')
            },
        }]);

        timer.play()
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 960,
    height: 640,
    scene: MyGame
};

const game = new Phaser.Game(config);

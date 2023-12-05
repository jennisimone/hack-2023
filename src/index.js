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
    }
      
    create ()
    {
        this.map = this.make.tilemap({key: "background"});
        const tileset = this.map.addTilesetImage("Background", "interior-tiles");
        this.layer = this.map.createLayer("Tile Layer 1", tileset, 0, 0);
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

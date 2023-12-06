import 'phaser';
import "./home.css";

export default class Win extends Phaser.Scene {
    pizza = {
      name: 'pizza',
      image: undefined,
    };
   
    
  constructor() {
    super('splash');
  }

  preload() {
    this.load.image(this.pizza.name, 'assets/pizza.png');
    
  }

  create() {
    this.cameras.main.setBackgroundColor('#023020');
    this.pizza.image = this.add.image(465, 195, this.pizza.name).setScale(1.5);
   

    this.add
      .text(510, 200, `Game Over!`, {
        fontFamily: 'PressStart2P-Regular',
        fontSize: '80px',
        color: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(500, 400, `Wins:`, {
        fontFamily: 'PressStart2P-Regular',
        fontSize: '50px',
        color: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');


      this.add
      .text(500, 600, `Score:`, {
        fontFamily: 'PressStart2P-Regular',
        fontSize: '50px',
        color: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');


    this.add
      .text(490, 675, `700`, {
        fontFamily: 'PressStart2P-Regular',
        fontSize: '50px',
        color: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(490, 800, `Play Again`, {
        fontFamily: 'PressStart2P-Regular',
        color: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.input.on(
      'pointerup',
      () => {
        this.scene.start('MyGame');
      },
      this,
    );
  }

  update() {
    this.pizza.image.angle += 0.5;
  }
}
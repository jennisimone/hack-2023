import 'phaser';
import "./home.css";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Home",
};

export default class Home extends Phaser.Scene {
    logo = {
    name: 'logo',
    image: undefined,
  };
   covid = {
    name: 'covid',
    image: undefined,
  };
    pizza = {
      name: 'pizza',
      image: undefined,
    };
    kebabs = {
      name: 'kebabs',
      image: undefined,
    };
    donuts = {
      name: 'donuts',
      image: undefined,
    };
    meat = {
      name: 'meat',
      image: undefined,
    };
    icecream = {
      name: 'icecream',
      image: undefined,
    };
    bdaycake = {
      name: 'bdaycake',
      image: undefined,
    };
    carrots = {
      name: 'carrots',
      image: undefined,
    };
    chicken = {
      name: 'chicken',
      image: undefined,
    };
    fish = {
      name: 'fish',
      image: undefined,
    };
    pancakes = {
      name: 'pancakes',
      image: undefined,
    };
    oranges = {
      name: 'oranges',
      image: undefined,
    };
    
  constructor() {
    super(sceneConfig);
  }

  preload() {
    this.load.image(this.kebabs.name, 'assets/kebabs.png');
    this.load.image(this.pizza.name, 'assets/pizza.png');
    this.load.image(this.bdaycake.name, 'assets/bdaycake.png');
    this.load.image(this.carrots.name, 'assets/carrots.png');
    this.load.image(this.chicken.name, 'assets/chicken.png');
    this.load.image(this.donuts.name, 'assets/donuts.png');
    this.load.image(this.fish.name, 'assets/fish.png');
    this.load.image(this.icecream.name, 'assets/icecream.png');
    this.load.image(this.meat.name, 'assets/meat.png');
    this.load.image(this.pancakes.name, 'assets/pancakes.png');
    this.load.image(this.oranges.name, 'assets/oranges.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.kebabs.image = this.add.image(200, 100, this.kebabs.name).setScale(1.5);
    this.donuts.image = this.add.image(40, 611, this.donuts.name).setScale(1.5);
    this.pizza.image = this.add.image(screenCenterX, 150, this.pizza.name).setScale(1.5);
    this.bdaycake.image = this.add.image(920, 600, this.bdaycake.name).setScale(1);
    this.carrots.image = this.add.image(800, 100, this.carrots.name).setScale(1.5);
    this.chicken.image = this.add.image(screenCenterX, 300, this.chicken.name).setScale(1.5);
    this.fish.image = this.add.image(850, 275, this.fish.name).setScale(1.5);
    this.icecream.image = this.add.image(100, 250, this.icecream.name).setScale(1);
    this.meat.image = this.add.image(750, 515, this.meat.name).setScale(1.5);
    this.pancakes.image = this.add.image(200, 500, this.pancakes.name).setScale(1.5);
    this.oranges.image = this.add.image(screenCenterX, 580, this.oranges.name).setScale(1.5);

    this.add
      .text(screenCenterX, 340, `Collect special items.`, {
        fontFamily: 'PressStart2P-Regular',
        color: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(screenCenterX, 400, `Fast Food Dash`, {
        fontFamily: 'PressStart2P-Regular',
        fontSize: '50px',
        color: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(screenCenterX, 450, `Player 1: WASD   Player 2: Arrows`, {
        fontFamily: 'PressStart2P-Regular',
        fontSize: '15px',
        color: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(screenCenterX, 500, `Play`, {
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
        this.scene.start('Game');
      },
      this,
    );
  }

  update() {
    this.pizza.image.angle += 0.5;
  }
}
class Bootup extends Phaser.Scene {
    constructor() {
        super('Bootup');
    }

    preload() {
        this.load.image('canvas_icon', './assets/imgs/canvas_icon.png');
        this.load.image('w95_desktop', './assets/imgs/w95_desktop.png');
        this.load.image('canvas_assignment', './assets/imgs/canvas_assignment.png');

        this.load.audio('fluroscent_buzz', './assets/sounds/fluroscent_buzz.wav');
    }

    create() {
        // add Desktop
        this.add.image(width / 2, height / 2, 'w95_desktop').setDisplaySize(width, height);

        // Play background buzz
        this.sound.add('fluroscent_buzz', {loop: true}).play();



        // Interactive Canvas icon
        this.canvas_icon = this.add.image(width / 2, height / 2, 'canvas_icon').setScale(0.05);
        this.canvas_icon.setInteractive({cursor: 'pointer'});

        // Add a listener for button press
        this.canvas_icon.once('pointerdown', () => {
            this.scene.start('Canvas');
        })
    }


    update() {
    }
}

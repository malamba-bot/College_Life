class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('w95_bootup', './assets/imgs/w95_bootup.jpg');
        this.load.image('canvas_icon', './assets/imgs/canvas_icon.png');
        this.load.image('w95_desktop', './assets/imgs/w95_desktop.png');
        this.load.image('canvas_assignment', './assets/imgs/canvas_assignment.png');
        this.load.image('assignment_1', './assets/imgs/assignment_1.png');

        this.load.audio('fluroscent_buzz', './assets/sounds/fluroscent_buzz.wav');
        this.load.audio('w95_bootup_sfx', './assets/sounds/w95_bootup_sfx.mp3');
    }

    create() {

        // Add bootup instructions
        this.add.text(width / 2, height / 2, "Press f to boot", {
            fontSize: '48px',
            align: 'center'
        }).setOrigin(0.5);

        // Listen for keypress
        var f_key = this.input.keyboard.addKey('f');
        f_key.once('down', () => this.scene.start('Bootup'));
    }

}

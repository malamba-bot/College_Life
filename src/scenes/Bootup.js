class Bootup extends Phaser.Scene {
    constructor() {
        super('Bootup');
    }

    preload() {
        this.load.image('canvas_icon', './assets/imgs/canvas_icon.png');
        this.load.image('w95_desktop', './assets/imgs/w95_desktop.png');

    }

    create() {
        this.add.image(width / 2, height / 2, 'w95_desktop').setDisplaySize(width, height);
        this.add.image(width / 2, height / 2, 'canvas_icon').setScale(0.05);
    }
}

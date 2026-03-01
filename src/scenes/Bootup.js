class Bootup extends Phaser.Scene {
    constructor() {
        super('Bootup');
    }

    preload() {
        this.load.image('canvas_icon', './assets/imgs/canvas_icon.png');

    }

    create() {
        this.add.image(width / 2, height / 2, 'canvas_icon').setScale(0.05);
    }
}

class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }
    create() {
        this.add.text(width/2, height/2, 'This be the Canvas scene');

    }
}

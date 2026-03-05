/* CHANGES TBM: change plugin load method
    */
class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    preload() {
    }

    create() {
        this.add.text(width/2, height/2, 'This be the Canvas scene');
        this.add.interactiveTextBox(this, width / 2, height / 2);

    }
}

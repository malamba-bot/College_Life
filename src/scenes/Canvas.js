class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    preload() {

    }

    create() {
        this.text_box_config = {
            width: 400,
            height: 200,
            color: 0xff0000
        };

        this.add.interactiveTextBox(width / 2 , height / 2, this.text_box_config);
    }
}

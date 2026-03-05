class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    preload() {

    }

    create() {
        this.text_box_config = {
            width: TEXTBOX_WIDTH,
            height: TEXTBOX_HEIGHT,
            color: 0xffffff,
            alpha: 0,
            stroke_thickness: 3,
            stroke_color: COLORS.BLUE
        };

        this.add.interactiveTextBox(width / 2 , height / 2, this.text_box_config);
    }
}

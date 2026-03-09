class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    create() {
        // Add Canvas background
        this.add.image(0, 0, 'canvas_assignment').setDisplaySize(width, height).setOrigin(0);

        // Add interactive textbox
        this.text_box_config = {
            width: TEXTBOX_WIDTH,
            height: TEXTBOX_HEIGHT,
            stroke_thickness: 3,
            stroke_color: COLORS.BLUE,
            text_padding: TEXTBOX_PADDING
        };

        this.textbox = this.add.interactiveTextBox(width / 2 , height / 2, this.text_box_config);
        this.textbox.setInteractive();
        //this.textbox.destroy();
    }

    update() {
    }
}

class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    create() {
        // Set up assignments
        this.assignment = 0;
        this.assignment_text = [assignment_text_1];

        // Add Canvas background
        this.add.image(0, 0, 'canvas_assignment').setDisplaySize(width, height).setOrigin(0);

        // Add assignment
        this.add.image(width / 2, height * 0.35, 'assignment_1').setDisplaySize(width * 0.3, height * 0.25);

        // Create submit button
        this.submit_button = this.add.rectangle(SUBMIT_X, SUBMIT_Y, SUBMIT_WIDTH, SUBMIT_HEIGHT, 0x327fba);
        this.submit_text = this.add.text(SUBMIT_X, SUBMIT_Y, 'Submit', {
            fontFamily: 'Arial',
            fontSize: '32px',
            align: 'center'
        }).setOrigin(0.5);
        this.submit_button.setInteractive({cursor: 'pointer'});
        this.submit_button.on('pointerdown', () => {
            console.log(this.assignment_text[this.assignment]);
            console.log(this.textbox.text);
            if (this.textbox.text == this.assignment_text[this.assignment]) {
                this.result_text = "You win gamer! Touch some grass";
            } else {
                this.result_text = "You've been touching too much grass... go practice your typing";
            }
            this.result.setText(this.result_text);
        })

        // Add result text
        this.result = this.add.text(width * 0.2, height, "", {
            color: '0x000000',
            fontSize: '32px',
            wordWrap: {
                width :700,
            }
        }).setOrigin(0, 1);

        // Add interactive textbox
        this.text_box_config = {
            width: TEXTBOX_WIDTH,
            height: TEXTBOX_HEIGHT,
            stroke_thickness: 3,
            stroke_color: COLORS.BLUE,
            text_padding: TEXTBOX_PADDING,
            font_size: 32,
            font_family: 'Times New Roman'
        };

        this.textbox = this.add.interactiveTextBox(width / 2 , height * 0.75, this.text_box_config);
        this.textbox.setInteractive();
        this.textbox.setText("Hello");
        this.textbox.typeText("\nHello again\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ndsfgsdfg");
    }

    update() {
    }
}

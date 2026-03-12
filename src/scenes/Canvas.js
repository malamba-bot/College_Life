import { globals } from '../main.js'
import InteractiveTextBox from '../prefabs/InteractiveTextBox.js';

export class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    create() {
        // Set up assignments
        this.assignment = 0;
        this.assignment_text = [globals.assignment_text_1];

        // Add Canvas background
        this.add.image(0, 0, 'canvas_assignment').setDisplaySize(globals.width, globals.height).setOrigin(0);

        // Add assignment
        this.add.image(globals.width / 2, globals.height * 0.35, 'assignment_1').setDisplaySize(globals.width * 0.3, globals.height * 0.25);

        // Create submit button
        this.submit_button = this.add.rectangle(globals.SUBMIT_X, globals.SUBMIT_Y, globals.SUBMIT_WIDTH, globals.SUBMIT_HEIGHT, 0x327fba);
        this.submit_text = this.add.text(globals.SUBMIT_X, globals.SUBMIT_Y, 'Submit', {
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
        this.result = this.add.text(globals.width * 0.2, globals.height, "", {
            color: '0x000000',
            fontSize: '32px',
            wordWrap: {
                width :700,
            }
        }).setOrigin(0, 1);

        // Add interactive textbox
        this.text_box_config = {
            width: globals.TEXTBOX_WIDTH,
            height: globals.TEXTBOX_HEIGHT,
            stroke_thickness: 3,
            stroke_color: globals.COLORS.BLUE,
            text_padding: globals.TEXTBOX_PADDING,
            font_size: 32,
            font_family: 'Times New Roman',
        };

        this.textbox = this.add.interactiveTextBox(globals.width / 2 , globals.height * 0.75, this.text_box_config);
        this.textbox.setText("Hello");
        this.textbox.typeText("Haha\nHaha\nHaha\nHaha\nHaha\nHaha\nHaha\nHaha\nHaha\nHaha\nHaha\n");
        this.textbox.setInteractive();

        this.textbox1 = this.add.interactiveTextBox(globals.width / 3, globals.height / 4, {width: 200, height: 400, stroke_thickness: 5, stroke_color: '0xff0000'});
        this.textbox1.setInteractive();

    }

    update() {
    }
}

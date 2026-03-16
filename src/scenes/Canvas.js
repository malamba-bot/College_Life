import { globals } from '../main.js';
import { create_pointer_listeners } from '../helpers/create_pointer_listeners.js'; 
import InteractiveTextBox from '../prefabs/InteractiveTextBox.js';

export class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    create() {
        // Everything in this scene will be placed in a container so that it can be collectively tweened
        // when the window is opened
        this.container = this.add.container(globals.width / 2, globals.height / 2);

        this.create_assets();
        create_pointer_listeners(this);

        // Check if begin button is pressed
        this.quiz_button.on('pointerdown', () => {
            this.game.events.emit('no_hover');
            this.scene.start('Quiz');
        });

        this.container.setScale(0);

        // Tween the container
        this.tweens.add({
            targets: this.container,
            scale: 1,
            duration: 800,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this.scene.stop('Desktop');
            }
        })

    }

    create_assets() {
        // Add Canvas background
        this.background = this.add.image(0, 0, 'canvas_background').setDisplaySize(globals.width, globals.height).setOrigin(0.5);

        // Add quiz heading and description
        this.quiz_heading = this.add.text(-globals.TEXTBOX_WIDTH / 2, -globals.height * 0.32, "Typing Quiz", {
            fontFamily: 'Arial',
            fontSize: globals.QUIZ_HEADING_SIZE,
            color: '#000000',
            padding: {
                x: globals.QUIZ_PADDING_X,
                y: globals.QUIZ_PADDING_Y
            }
        });

        this.quiz_desc = this.add.text(this.quiz_heading.x, this.quiz_heading.y + globals.QUIZ_PADDING_Y + globals.QUIZ_HEADING_SIZE,
            'Copy the code snippets shown by typing them out in the textbox. There will be five questions. If you fail to complete a question within the alloted time, you will be marked down. No retakes.',
            {
                fontFamily: 'Arial',
                fontSize: globals.QUIZ_DESC_SIZE,
                color: '#00',
                wordWrap : {
                    width: globals.TEXTBOX_WIDTH - globals.QUIZ_PADDING_X * 2,
                },
                padding: {
                    x: globals.QUIZ_PADDING_X,
                    y: globals.QUIZ_PADDING_Y
                }
        });

        // Begin button
        this.quiz_button = this.add.rectangle(
            this.quiz_heading.x + globals.QUIZ_PADDING_X,
            this.quiz_desc.y + this.quiz_desc.height + globals.QUIZ_PADDING_Y / 4,
            globals.SUBMIT_WIDTH,
            globals.SUBMIT_HEIGHT,
            globals.COLORS.BUTTON_BLUE).setInteractive().setOrigin(0);
        this.quiz_button.setRounded(globals.BUTTON_ROUNDING);
        this.quiz_button.setStrokeStyle(globals.BUTTON_STROKE, globals.COLORS.BLACK);
        this.quiz_button_text = this.add.text(
            this.quiz_button.x + this.quiz_button.width / 2,
            this.quiz_button.y + this.quiz_button.height / 2,
            'Begin',
            globals.BUTTON_TEXT_CONF).setOrigin(0.5);

        // Quiz framing
        this.quiz_desc_box = this.add.rectangle(
            this.quiz_heading.x, 
            this.quiz_heading.y, 
            globals.TEXTBOX_WIDTH, 
            this.quiz_desc.height + this.quiz_heading.height + this.quiz_button.height,
            null, 
            0).setOrigin(0);
        this.quiz_desc_box.setStrokeStyle(2, globals.COLORS.GREY, 0.5);
        this.quiz_desc_box.setRounded(5);
        this.quiz_desc_line = this.add.rectangle(
            this.quiz_heading.x + globals.QUIZ_PADDING_X, 
            this.quiz_heading.y + globals.QUIZ_HEADING_SIZE + globals.QUIZ_PADDING_Y * 1.5,
            globals.TEXTBOX_WIDTH - globals.QUIZ_PADDING_Y * 2,
            2,
            globals.COLORS.GREY,
            0.5).setOrigin(0);
        
        // Add visible elements to a container to be tweened
        this.children.list.slice().forEach( (obj) => {
            if (obj != this.container && obj != this.feedback) {
                this.container.add(obj);
            }});
    }
}

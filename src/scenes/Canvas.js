import { globals } from '../main.js';
import InteractiveTextBox from '../prefabs/InteractiveTextBox.js';
import assignments from '../../resources/assignments.js';

export class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    preload() {
        this.load.image('quiz_desc', './assets/imgs/quiz_desc.png');
    }

    create() {
        // Everything in this scene will be placed in a container so that it can be collectively tweened
        // when the window is opened
        this.container = this.add.container(globals.width / 2, globals.height / 2);

        // Get the correct strings from the assignment object
        this.assignment_key = Object.values(assignments);
        this.assignment_idx = 0;

        this.create_assets();

        // Add listeners to check if the cursor is hovering over something
        this.input.on('pointerover', (pointer, targets) => {
                this.game.events.emit('valid_hover');
        });

        this.input.on('pointerout', (pointer, targets) => { 
            this.game.events.emit('no_hover') 
        });

        // Add a general listener for clicking
        this.input.on('pointerdown', () => {
           this.sound.play('click_sfx');
        });

        // Create listener for submit button, which adds to recent feedback column and moves to the next
        // assignment
        this.submit_button.on('pointerdown', () => {
            this.add_feedback(this.assignment_idx, this.evaluate_accuracy());
            this.assignment_idx++;
        })

        // Add result text
        this.result = this.add.text(globals.width * 0.2, globals.height, "", {
            color: '0x000000',
            fontSize: '32px',
            wordWrap: {
                width :700,
            }
        }).setOrigin(0, 1);

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

    update() {
    }

    add_feedback(assignment_num, accuracy) { 
        let header = this.add.text(0, this.next_feedback_insertion, `Assignment ${assignment_num + 1}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#1f7c9e',
            align: 'left',
            padding: {
                x: 0,
                y: 0
            }
        }).setOrigin(0);
        this.next_feedback_insertion += header.height + 10;

        let grade = this.add.text(0, this.next_feedback_insertion, `${(accuracy * 10).toFixed(2)} out of 10`, {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#000000',
            align: 'left',
            padding: {
                x: 0,
                y: 0
            }
        }).setOrigin(0);
        this.next_feedback_insertion += grade.height + 20;

        this.feedback.add(header);
        this.feedback.add(grade);
    }

    evaluate_accuracy() {
        const text = this.textbox.getText();
        const expected_text = this.assignment_key[this.assignment_idx];
        let num_correct_chars = 0;
        
        let count = text.length < expected_text.length ? 
            text.length :
            expected_text.length;

        for (let i = 0; i < count; i++) {
            if (text[i] == expected_text[i])
                num_correct_chars++;
        }
        
        let accuracy;
        if (text.length < expected_text.length) {
            accuracy = num_correct_chars / expected_text.length;
        } else {
            accuracy = num_correct_chars / text.length;
        }
        return accuracy;
    }

    create_assets() {
        // Add Canvas background
        this.background = this.add.image(0, 0, 'canvas_assignment').setDisplaySize(globals.width, globals.height).setOrigin(0.5);

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
        
        // Submit button
        this.submit_button = this.add.rectangle(globals.SUBMIT_X, globals.SUBMIT_Y, globals.SUBMIT_WIDTH, globals.SUBMIT_HEIGHT, globals.COLORS.BUTTON_BLUE).setInteractive();
        this.submit_button.setRounded(globals.BUTTON_ROUNDING);
        this.submit_button.setStrokeStyle(globals.BUTTON_STROKE, globals.COLORS.BLACK);
        this.submit_text = this.add.text(globals.SUBMIT_X, globals.SUBMIT_Y, 'Submit', globals.BUTTON_TEXT_CONF).setOrigin(0.5);

        // Add interactive textbox
        this.text_box_config = {
            width: globals.TEXTBOX_WIDTH,
            height: globals.TEXTBOX_HEIGHT,
            stroke_thickness: 3,
            stroke_color: globals.COLORS.BLUE,
            text_padding: globals.TEXTBOX_PADDING,
            font_size: 32,
        };

        this.textbox = this.add.interactiveTextBox(0, globals.height * 0.25, this.text_box_config);
        this.textbox.setInteractive();

        this.feedback = this.add.container(globals.width * 0.81, globals.height * 0.47);
        this.next_feedback_insertion = 0;
        // Add visible elements to a container to be tweened
        this.children.list.slice().forEach( (obj) => {
            if (obj != this.container && obj != this.feedback) {
                this.container.add(obj);
            }
        });
    }
}

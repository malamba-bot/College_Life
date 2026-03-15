import { globals } from '../main.js';
import InteractiveTextBox from '../prefabs/InteractiveTextBox.js';
import assignments from '../../resources/assignments.js';

export class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    preload() {
        // Load keyboard sounds. The following block is AI generated : https://claude.ai/share/2c8a54c7-9c9a-4188-93fe-f7dc22177752
        this.load.audio('keyboard_in_1', 'assets/sounds/keyboard_sfx/keyboard_in_1.mp3');
        this.load.audio('keyboard_out_1', 'assets/sounds/keyboard_sfx/keyboard_out_1.mp3');
        this.load.audio('keyboard_1', 'assets/sounds/keyboard_sfx/keyboard_1.mp3');
        this.load.audio('keyboard_3', 'assets/sounds/keyboard_sfx/keyboard_2.mp3');
        this.load.audio('keyboard_2', 'assets/sounds/keyboard_sfx/keyboard_3.mp3');
        this.load.audio('keyboard_space', 'assets/sounds/keyboard_sfx/keyboard_space.mp3');
    }

    create() {
        // Add keyboard sounds to the sound manager. The following block is
        // AI generated : https://claude.ai/share/2c8a54c7-9c9a-4188-93fe-f7dc22177752
        this.sound.add('keyboard_in_1');
        this.sound.add('keyboard_out_1');
        this.sound.add('keyboard_2');
        this.sound.add('keyboard_3');
        this.sound.add('keyboard_space');

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

        // Play typing sound on keypress
        this.input.keyboard.on('keydown', (key) => { 
            if (this.textbox.active) {
                console.log(key.key);
                if (key.key == ' ') {
                console.log(key.key);
                    this.sound.play('keyboard_space');
                } else
                    this.sound.play(`keyboard_${Phaser.Math.Between(1, 2)}`); 
            }
        });

        this.input.keyboard.on('keyup', () => { 
            if (this.textbox.active) {
            }

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
        this.container.add(this.background);

        // Add assignment
        this.assignment = this.add.image(0, globals.height * (-0.25), 'assignment_1').setDisplaySize(globals.width * 0.3, globals.height * 0.25).setOrigin(0.5);
        this.container.add(this.assignment);

        // Create submit button
        this.submit_button = this.add.rectangle(globals.SUBMIT_X, globals.SUBMIT_Y, globals.SUBMIT_WIDTH, globals.SUBMIT_HEIGHT, 0x327fba);
        this.submit_text = this.add.text(globals.SUBMIT_X, globals.SUBMIT_Y, 'Submit', {
            fontFamily: 'Arial',
            fontSize: '32px',
            align: 'center'
        }).setOrigin(0.5);
        this.submit_button.setInteractive();
        this.container.add(this.submit_button);
        this.container.add(this.submit_text);

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
        this.container.add(this.textbox);

        this.feedback = this.add.container(globals.width * 0.81, globals.height * 0.47);
        this.next_feedback_insertion = 0;
    }
}

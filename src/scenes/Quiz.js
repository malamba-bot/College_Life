import { globals } from '../main.js';
import InteractiveTextBox from '../prefabs/InteractiveTextBox.js';
import { create_pointer_listeners } from '../helpers/create_pointer_listeners.js'; 
import questions from '../../resources/questions.js';

export class Quiz extends Phaser.Scene {
    constructor() {
        super('Quiz');
    }

    create() {
        // Everything in this scene will be in a container so it can be
        // collectivly tweened
        this.container = this.add.container(globals.width / 2, globals.height / 2);

        // Store all question answers in an array, whose active index is
        // this.quiz_idx
        this.quiz_key = Object.values(questions);
        // The times allowed for each question
        this.question_time_limits = [0, 50000, 40000, 30000, 2000];
        // Dummy entry to start indexing at one
        this.quiz_key.unshift('');
        this.quiz_idx = 1;

        this.create_objects();
        create_pointer_listeners(this);
        
        // Create listener for submit button, which adds to recent feedback column and moves to the next
        // assignment
        this.submit_button.on('pointerdown', ()=> { this.move_to_next_question(); });
    }

    update() {
        if (this.question_time) {
            this.timer_text.setText(
                `${globals.TIMER_TEXT}${Math.ceil(this.question_time.getRemainingSeconds())}`);
        }
    }

    move_to_next_question() {
        this.add_feedback(this.quiz_idx, this.evaluate_accuracy());
        if (this.quiz_idx < 4) {
            this.quiz_idx++;
            this.start_timer();
            this.show_next_question();
            this.textbox.clearText();
        } else {
            this.scene.launch('Desktop');
            // Tween down and start next scene if at last question
            this.feedback.visible = false;
            this.tweens.add({
                targets: this.container,
                scale: 0,
                duration: 800,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    this.scene.stop('Quiz');
                }
            })

        }

    }

    start_timer() {
        if (this.question_time) {
            this.question_time.remove();
        }

        this.question_time = this.time.delayedCall(
            this.question_time_limits[this.quiz_idx],
            () => this.move_to_next_question());
    }


    create_objects() {
        this.titlebar = this.add.image(
            -globals.width / 2,
            -globals.height / 2,
            'wxp_titlebar').setOrigin(0);
        this.background = this.add.image(
            0, 
            this.titlebar.height / 2, 
            'quiz_background').
            setDisplaySize(globals.width, globals.height - this.titlebar.height).setOrigin(0.5);

        // Container for the recent feedback
        this.feedback = this.add.container(globals.width * 0.81, globals.height * 0.55);
        this.next_feedback_insertion = 0;

        // Add result text
        this.result = this.add.text(globals.width * 0.2, globals.height, "", {
            color: '0x000000',
            fontSize: '32px',
            wordWrap: {
                width :700,
            }
        }).setOrigin(0, 1);

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

        this.textbox = this.add.interactiveTextBox(
            globals.TEXTBOX_X,
            globals.TEXTBOX_Y,
            this.text_box_config);
        this.textbox.setInteractive();

        // Add timer text
        this.timer_text = this.add.text(
            globals.TEXTBOX_X - globals.TEXTBOX_WIDTH / 2,
            globals.height * -0.5,
            globals.TIMER_TEXT,
            globals.NORMAL_TEXT_CONFIG
        ).setOrigin(0);
        this.timer_text.setFontSize(globals.TIMER_TEXT_SIZE);

        // Add visible elements to a container to be tweened
        this.children.list.slice().forEach( (obj) => {
            if (obj != this.container && obj != this.feedback) {
                this.container.add(obj);
            }});

        // Add first assignment
        this.show_next_question();
        this.start_timer();
    }

    add_feedback(question_num, accuracy) { 
        let header = this.add.text(0, this.next_feedback_insertion, `Question ${question_num}`, {
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

        let grade = this.add.text(
            0, 
            this.next_feedback_insertion, 
            `${(accuracy * 10).toFixed(2)} out of 10`, 
            {
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
        const expected_text = this.quiz_key[this.quiz_idx];
        let num_correct_chars = 0;
        
        let count = text.length < expected_text.length ? 
            text.length :
            expected_text.length;

        for (let i = 0; i < count; i++) {
            if (text[i] === expected_text[i])
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

    show_next_question() {
        // Get rid of last question
        if (this.question) {
            this.assignment_outline.destroy();
            this.question.destroy();
        }

        // Show next question
        this.question = this.add.image(
            globals.TEXTBOX_X,
            globals.QUESTION_Y,
            `question_${this.quiz_idx}`)
            .setOrigin(0.5, 0);

        this.assignment_outline = this.add.rectangle(
            globals.TEXTBOX_X,
            globals.QUESTION_Y,
            this.question.width,
            this.question.height
        ).setStrokeStyle(globals.QUESTION_BOX_STROKE, globals.COLORS.BLUE, 1)
        .setOrigin(0.5, 0)
        .setRounded(globals.QUESTION_BOX_ROUNDING);

        this.container.add(this.question);
        this.container.add(this.assignment_outline);

    }
}

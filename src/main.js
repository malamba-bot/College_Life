/*
    * Name: Max Kinet
    * Title: College Life
    * Hours: 60
    * Sources (also inline)
    *   retrozone shader which I modified came from https://github.com/TheMarco/retrozone
    *   Method to remove last char in a string (InteractiveTextBox.js, 76): https://stackoverflow.com/questions/952924/how-do-i-chop-slice-trim-off-last-character-in-string-using-javascript
    * Also big thanks to https://github.com/Drullkus for helping make sense of the retrozone shader and make some edits!
    * 
    * Notes: A lot of time went into creating the interactive textbox
    * (plugin of my own creation), since I needed something that didn't
    * leverage a DOM element to use it underneath the shader. I also have a few
    * hybrid scenes which are recycled to condense code. This was done
    * through passing "mode" from scene-to-scene (in case that causes any
    * confusion)
    */
import { Menu } from './scenes/Menu.js';
import { Bootup } from './scenes/Bootup.js';
import { Desktop } from './scenes/Desktop.js';
import { Canvas } from './scenes/Canvas.js';
import { Quiz } from './scenes/Quiz.js';
import { Cursor } from './scenes/Cursor.js';
import { PostcardBack } from './scenes/PostcardBack.js';
import { Credits } from './scenes/Credits.js';
import { RetroDisplay } from '../retrozone/src/index.js';

let config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    physics: { 
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Menu, Bootup, Desktop, Canvas, Quiz, PostcardBack, Credits, Cursor],
}

export let game = new Phaser.Game(config);

// Apply retrozone shader to canvas. Code snippet and shader grabbed from https://github.com/TheMarco/retrozone
    setTimeout(() => {
        const display = new RetroDisplay(game.canvas, {
            mode: 'crt',
            persist: true,
        });
    }, 100);
// The following object literal was AI generated. https://claude.ai/share/7c9f727e-54c5-4102-ac67-f6de329d0c0e
    export const globals = {
        height: game.config.height,
        width: game.config.width,

        // Textbox configuration constants
        get TEXTBOX_WIDTH() { return this.width * 0.65; },
        get TEXTBOX_HEIGHT() { return this.height * 0.3; },
        get TEXTBOX_X() { return this.height * -0.1; },
        get TEXTBOX_Y() { return this.height * 0.25; },
        TEXTBOX_PADDING: 20,

        // General button configuration
        BUTTON_ROUNDING: 2,
        BUTTON_STROKE: 0.5,
        BUTTON_TEXT_CONF: {
            fontFamily: 'Arial',
            fontSize: '32px',
            align: 'center'
        },

        // Question config constants
        QUESTION_BOX_ROUNDING: 4,
        QUESTION_BOX_STROKE: 4,
        get QUESTION_Y() { return this.height * -0.4; },

        // Submit button configuration constants
        SUBMIT_WIDTH: 150,
        SUBMIT_HEIGHT: 50,
        get SUBMIT_X() { return this.TEXTBOX_X + this.TEXTBOX_WIDTH * 0.5 - this.SUBMIT_WIDTH * 0.5; },
        get SUBMIT_Y() { return this.height * 0.45; },

        // Quiz description constants
        QUIZ_HEADING_SIZE: 64,
        QUIZ_DESC_SIZE: 32,
        QUIZ_PADDING_X: 35,
        QUIZ_PADDING_Y: 55,
        get QUIZ_DESC_WIDTH() { return this.width * 0.55; },
        get NORMAL_TEXT_CONFIG() {
            return {
                fontFamily: 'Arial',
                fontSize: this.QUIZ_DESC_SIZE,
                color: '#00',
                wordWrap: {
                    width: this.QUIZ_DESC_WIDTH - this.QUIZ_PADDING_X * 2,
                },
                padding: {
                    x: this.QUIZ_PADDING_X,
                    y: this.QUIZ_PADDING_Y
                }
            };
        },

        // Timer text constants
        TIMER_TEXT_SIZE: 24,
        TIMER_TEXT: 'Time remaining: ',

        // Email page constants
        EMAIL_WIDTH: 1200,
        EMAIL_HEIGHT: 800,
        EMAIL_PADDING_X: 40,
        EMAIL_PADDING_Y: 80,

        MESSAGE:
        `Hello brother,\n
        College is hard, my brain can't walk a yard. My digits have made it far, but I am turning into a ball of lard.
        \nSincerely
        \tThe Other One`,

        QUIZ_START_MSG: 
            'Copy the code snippets shown by typing them out in the textbox. There will be five questions. If you fail to complete a question within the alloted time, you will be marked down. No retakes.',

        COLORS: {
            BLUE: 0x1f7c9e,
            BUTTON_BLUE: 0x327fba,
            GREY: 0x7a7674, 
            BLACK: 0x000000
        },
};

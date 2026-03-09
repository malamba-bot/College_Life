
let config = {
    type: Phaser.WEBGL,
    width: 1900,
    height: 950,
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
    scene: [Bootup, Canvas],
}

let game = new Phaser.Game(config);

let { height, width } = game.config;

// Textbox configuration constants
const TEXTBOX_WIDTH = width * 0.55;
const TEXTBOX_HEIGHT = height * 0.3;
const TEXTBOX_PADDING = 20;

// Submit button configuration constants
const SUBMIT_WIDTH = 150;
const SUBMIT_HEIGHT = 50;
const SUBMIT_X = width * 0.5 + TEXTBOX_WIDTH * 0.5 - SUBMIT_WIDTH * 0.5;
const SUBMIT_Y = height * 0.95;

const COLORS = {
    BLUE: 0x1f7c9e
}

// Correct assignment strings
const assignment_text_1 =
`#include <stdio.h>

int main(void) {
	printf("Hello, world!\\n");
}`

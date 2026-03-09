
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

const TEXTBOX_WIDTH = width * 0.5;
const TEXTBOX_HEIGHT = height * 0.3;
const TEXTBOX_PADDING = 20;

const COLORS = {
    BLUE: 0x1f7c9e
}

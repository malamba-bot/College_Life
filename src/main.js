
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
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [],
}

let game = new Phaser.Game(config);

let { height, width } = game.config;


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
    scene: [Bootup],
}

let game = new Phaser.Game(config);

let { height, width } = game.config;

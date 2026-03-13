import { globals } from '../main.js'

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('wxp_bootup_screen', './assets/imgs/wxp_bootup_screen.png');
        this.load.image('wxp_toolbar', './assets/imgs/wxp_toolbar.png');
        this.load.image('canvas_icon', './assets/imgs/canvas_icon.png');
        this.load.image('wxp_wallpaper', './assets/imgs/wxp_wallpaper.jpg');
        this.load.image('canvas_assignment', './assets/imgs/canvas_assignment.png');
        this.load.image('assignment_1', './assets/imgs/assignment_1.png');

        this.load.audio('fluroscent_buzz', './assets/sounds/fluroscent_buzz.wav');
        this.load.audio('wxp_bootup_sfx', './assets/sounds/wxp_bootup_sfx.mp3');
        this.load.audio('click_sfx', './assets/sounds/click.mp3');

        this.load.spritesheet('wxp_bootup_load', './assets/imgs/wxp_bootup_load_bar.png', {
            frameWidth: 182,
            frameHeight: 35,
            startFrame: 0,
            endFrame: 18,
        });
    }

    create() {

        // Add bootup instructions
        this.add.text(globals.width / 2, globals.height / 2, "Press f to boot", {
            fontSize: '48px',
            align: 'center'
        }).setOrigin(0.5);

        // Listen for keypress
        var f_key = this.input.keyboard.addKey('f');
        var k_key = this.input.keyboard.addKey('k');
        f_key.once('down', () => this.scene.start('Bootup'));
        k_key.once('down', () => this.scene.start('Canvas'));
    }

}

import { globals } from '../main.js'

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('wxp_bootup_screen', './assets/imgs/wxp_bootup_screen.png');
        this.load.image('wxp_start_menu', './assets/imgs/wxp_start_menu.png');
        this.load.image('wxp_toolbar', './assets/imgs/wxp_toolbar.png');
        this.load.image('wxp_wallpaper', './assets/imgs/wxp_wallpaper.jpg');
        this.load.image('wxp_titlebar', './assets/imgs/wxp_titlebar.png');
        this.load.image('wxp_mail', './assets/imgs/wxp_mail.png');
        this.load.image('canvas_icon', './assets/imgs/canvas_icon.png');
        this.load.image('canvas_background', './assets/imgs/canvas_background.png');
        this.load.image('quiz_background', './assets/imgs/quiz_background.png');

        this.load.image('question_1', './assets/imgs/questions/question_1.png');
        this.load.image('question_2', './assets/imgs/questions/question_2.png');
        this.load.image('question_3', './assets/imgs/questions/question_3.png');
        this.load.image('question_4', './assets/imgs/questions/question_4.png');

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
        this.add.text(globals.width / 2, globals.height / 2, 
            "Press f to boot \n\n Press c for credits", {
            fontSize: '48px',
            align: 'center'
        }).setOrigin(0.5);

        // Display custom cursor
        this.scene.launch('Cursor');

        // Listen for keypress
        var f_key = this.input.keyboard.addKey('f');
        var k_key = this.input.keyboard.addKey('k');
        var d_key = this.input.keyboard.addKey('d');
        var g_key = this.input.keyboard.addKey('g');
        var c_key = this.input.keyboard.addKey('c');
        c_key.once('down', () => this.scene.start('Credits'));
        f_key.once('down', () => this.scene.start('Bootup'));
        k_key.once('down', () => this.scene.start('Canvas', {mode: 'quiz_start'}));
        d_key.once('down', () => this.scene.start('Desktop', 'postcard_front'));
        g_key.once('down', () => this.scene.start('Desktop', 'postcard_back'));
    }

}

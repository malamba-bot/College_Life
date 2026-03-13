import { globals } from '../main.js'
export class Desktop extends Phaser.Scene {
    constructor() {
        super("Desktop");
    }

    create() {
        // add Desktop and toolbar
        this.add.image(globals.width / 2, globals.height / 2, 'wxp_wallpaper').setDisplaySize(globals.width, globals.height);
        this.toolbar = this.add.image(0, globals.height, 'wxp_toolbar').setDisplaySize(globals.width, globals.height * 0.04).setOrigin(0, 1);


        // Play background buzz
        this.sound.add('fluroscent_buzz', {loop: true, volume: 2.5}).play();

        // Add click sfx
        this.sound.add('click_sfx');

        // Interactive Canvas icon
        this.canvas_icon = this.add.image(globals.width / 2, globals.height / 2, 'canvas_icon').setScale(0.05);
        this.canvas_icon.setInteractive({cursor: 'pointer'});

        // Add a general listener for clicking
        this.input.on('pointerdown', () => {
           this.sound.play('click_sfx');
        });


        // Add a listener for button press
        this.canvas_icon.on('pointerdown', () => {
            this.scene.launch('Canvas');
        })
    }

}

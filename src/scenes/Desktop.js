import { globals } from '../main.js'
export class Desktop extends Phaser.Scene {
    constructor() {
        super("Desktop");
    }

    create() {
        // add Desktop
        this.add.image(globals.width / 2, globals.height / 2, 'wxp_wallpaper').setDisplaySize(globals.width, globals.height);

        // Play background buzz
        this.sound.add('fluroscent_buzz', {loop: true, volume: 2.5}).play();

        // Add click sfx
        this.click_sfx = this.sound.add('click_sfx');

        // Interactive Canvas icon
        this.canvas_icon = this.add.image(globals.width / 2, globals.height / 2, 'canvas_icon').setScale(0.05);
        this.canvas_icon.setInteractive({cursor: 'pointer'});

        // Add a listener for button press
        this.canvas_icon.once('pointerdown', () => {
            this.click_sfx.play();
            this.scene.launch('Canvas');
        })
    }

}

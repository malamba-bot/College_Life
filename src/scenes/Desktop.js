import { globals } from '../main.js'
export class Desktop extends Phaser.Scene {
    constructor() {
        super("Desktop");
    }

    create() {
        // add Desktop and toolbar
        this.add.image(globals.width / 2, globals.height / 2, 'wxp_wallpaper').setDisplaySize(globals.width, globals.height);
        this.toolbar = this.add.image(0, globals.height, 'wxp_toolbar').setOrigin(0, 1);

        // Add start menu, and rectangles to check if the start button or start menu canvas icons are
        // pressed
        this.start_menu = this.add.image(0, globals.height - this.toolbar.height, 'wxp_start_menu').setOrigin(0, 1);
        // Note: objects added to the corner have a slight offset to account for the barrel distortion
        // caused by retrozone (it misaligns the visual placement and world space placement at the
        // corners)
        this.start_button = this.add.rectangle(50, globals.height - 40, 120, this.toolbar.height, 0xff0000, 0).setOrigin(0, 1).setInteractive();
        this.start_menu_icons = this.add.rectangle(0, globals.height - this.start_menu.height + 90, this.start_menu.width, 65, 0xff0000, 0).setOrigin(0, 1).setInteractive({ cursor: 'pointer' });
        this.start_menu.visible = false;
        // Play background buzz
        this.sound.add('fluroscent_buzz', {loop: true, volume: 2.5}).play();

        // Add click sfx
        this.sound.add('click_sfx');

        // Interactive Canvas icon
        this.canvas_icon = this.add.image(globals.width / 2, globals.height / 2, 'canvas_icon').setScale(0.05);
        this.canvas_icon.setInteractive({cursor: 'pointer'});

        // Add a general listener for clicking
        this.input.on('pointerdown', (pointer, targets) => {
           this.sound.play('click_sfx');

            // Check if canvas icon is clicked
            if (targets.includes(this.canvas_icon) || targets.includes(this.start_menu_icons)) {
                this.scene.launch('Canvas');
            }

            // Check if start button is clicked
            if (targets.includes(this.start_button)) {
                this.start_menu.visible = true;
            } else {
                this.start_menu.visible = false;
            }
        });
    }

}

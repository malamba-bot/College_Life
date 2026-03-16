import { globals } from '../main.js'
import { create_pointer_listeners } from '../helpers/create_pointer_listeners.js'; 

export class Desktop extends Phaser.Scene {
    constructor() {
        super("Desktop");
    }

    create() {
        this.create_objects();
        // Play background buzz
        this.sound.add('fluroscent_buzz', {loop: true, volume: 2.5}).play();
        // Add click sfx
        this.sound.add('click_sfx');

        // Add listeners for changing the cursor state and click sounds
        create_pointer_listeners(this);

        // Check if a canvas icon is clicked
        this.input.on('pointerdown', (pointer, targets) => {
            // Check if canvas icon is clicked
            if (targets.includes(this.canvas_icon) || targets.includes(this.start_menu_icons)) {
                // Change cursor back to normal and launch next scene
                this.game.events.emit('no_hover') 
                this.scene.launch('Canvas');
            }

            // Check if start button is clicked
            if (targets.includes(this.start_button)) {
                this.start_menu.visible = true;
                this.start_menu_icons.visible = true;
            } else {
                this.start_menu.visible = false;
                this.start_menu_icons.visible = false;
            }
        });
    }

    create_objects() {
        // add Desktop and toolbar
        this.add.image(globals.width / 2, globals.height / 2, 'wxp_wallpaper').setDisplaySize(globals.width, globals.height);
        this.toolbar = this.add.image(0, globals.height, 'wxp_toolbar').setOrigin(0, 1);

        // Add start menu, and rectangles to check if the start button or start menu canvas icons are
        // pressed
        this.start_menu = this.add.image(0, globals.height - this.toolbar.height, 'wxp_start_menu').setOrigin(0, 1);
        this.start_button = this.add.rectangle(0, globals.height, 120, this.toolbar.height, 0xff0000, 0).setOrigin(0, 1).setInteractive();
        this.start_menu_icons = this.add.rectangle(0, globals.height - this.start_menu.height + 90, this.start_menu.width, 65, 0xff0000, 0).setOrigin(0, 1).setInteractive();
        this.start_menu.visible = false;
        // Note: Even though the icons interactive rectangles has no alpha, it is set to invisible to
        // toggle of its interactivity until the start button is pressed
        this.start_menu_icons.visible = false;

        // Interactive Canvas icon
        this.canvas_icon = this.add.image(globals.width / 2, globals.height / 2, 'canvas_icon').setScale(0.05);
        this.canvas_icon.setInteractive();
    }
}

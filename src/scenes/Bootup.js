import { globals } from '../main.js'

export class Bootup extends Phaser.Scene {
    constructor() {
        super('Bootup');
    }

    create() {
        // Create loading bar animation
        this.anims.create({
            key: 'bootup',
            frames: this.anims.generateFrameNumbers('wxp_bootup_load'),
            frameRate: 8,
            repeat: -1
        });

        // Add background sprite
        this.add.image(0, 0, 'wxp_bootup_screen').setOrigin(0).setDisplaySize(globals.width, globals.height);

        // Play loading animation
        this.boot_screen = this.add.sprite(globals.width / 2, globals.height * 0.728, 'wxp_bootup').setOrigin(0.5, 0);
        this.boot_screen.play('bootup');

        // Create bootup sound instance
        this.bootup_sound = this.sound.add('wxp_bootup_sfx');

        // Add a listener for when the sound is done
        this.bootup_sound.once('complete', () => { this.scene.start('Desktop'); } );

        this.bootup_sound.play();

    }
}

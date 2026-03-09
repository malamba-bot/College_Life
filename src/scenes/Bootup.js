class Bootup extends Phaser.Scene {
    constructor() {
        super('Bootup');
    }

    create() {
        // Add background image
        this.add.image(0, 0, 'w95_bootup').setOrigin(0).setDisplaySize(width, height);
        // Create bootup sound instance
        this.bootup_sound = this.sound.add('w95_bootup_sfx');

        // Add a listener for when the sound is done
        this.bootup_sound.once('complete', () => { this.scene.start('Desktop'); } );

        this.bootup_sound.play();

    }
}

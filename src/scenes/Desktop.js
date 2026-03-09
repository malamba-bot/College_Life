class Desktop extends Phaser.Scene {
    constructor() {
        super("Desktop");
    }

    create() {
        // add Desktop
        this.add.image(width / 2, height / 2, 'w95_desktop').setDisplaySize(width, height);

        // Play background buzz
        this.sound.add('fluroscent_buzz', {loop: true}).play();



        // Interactive Canvas icon
        this.canvas_icon = this.add.image(width / 2, height / 2, 'canvas_icon').setScale(0.05);
        this.canvas_icon.setInteractive({cursor: 'pointer'});

        // Add a listener for button press
        this.canvas_icon.once('pointerdown', () => {
            this.scene.start('Canvas');
        })
    }

}

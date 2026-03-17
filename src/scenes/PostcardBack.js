import { globals } from '../main.js';

export class PostcardBack extends Phaser.Scene {
    constructor() {
        super('PostcardBack');
    }

    create() {
        this.container = this.add.container(globals.width / 2, globals.height / 2);

        this.background = this.add.image(0, 0, 'wxp_mail').setDisplaySize(globals.EMAIL_WIDTH, globals.EMAIL_HEIGHT);

        this.text_box_config = {
            width: globals.EMAIL_WIDTH - 40,
            height: globals.EMAIL_HEIGHT - 80,
            text_padding: globals.TEXTBOX_PADDING,
            font_size: 32,
        };
        this.message = this.add.interactiveTextBox(0, 0, this.text_box_config)
        .typeText(globals.MESSAGE);

        // Add visible elements to a container to be tweened
        this.children.list.slice().forEach( (obj) => {
            if (obj != this.container && obj != this.feedback) {
                this.container.add(obj);
            }});

        this.container.setScale(0);
        // Tween the container
        this.tweens.add({
            targets: this.container,
            scale: 1,
            duration: 800,
            ease: 'Cubic.easeOut',
            onComplete: () => {
            }
        })
    }

}

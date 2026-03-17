import { globals } from '../main.js';

export class PostcardBack extends Phaser.Scene {
    constructor() {
        super('PostcardBack');
    }

    create() {
        this.container = this.add.container(globals.width / 2, globals.height / 2);

        this.background = this.add.image(0, 0, 'wxp_mail').setDisplaySize(1200, 800);

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

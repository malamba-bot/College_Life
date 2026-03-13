/*
    * This scene renders a cursor in the canvas to normalize the game-space cursor position with the visual warp caused by the barrel distortion in the
    * retrozone shader. It runs on top of all other scenes so that the cursor persists across them.
    */
export class Cursor extends Phaser.Scene {
    constructor() {
        super('Cursor');
    }

    preload() {
        this.load.image('default_cursor', './assets/imgs/default_arrow.png');
    }

    create() {
        this.cursor = this.add.image(this.input.activePointer.x, this.input.activePointer.y, 'default_cursor');
    }

    update() {
       this.cursor.setPosition(this.input.activePointer.x, this.input.activePointer.y);
    }
}

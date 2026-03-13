/*
    * This scene renders a cursor in the canvas to normalize the game-space cursor position with the visual warp caused by the barrel distortion in the
    * retrozone shader. It runs on top of all other scenes so that the cursor persists across them.
    */
export class Cursor extends Phaser.Scene {
    constructor() {
        super('Cursor');
    }

    preload() {
        this.load.spritesheet('cursor', './assets/imgs/cursor_spritesheet.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 2,
        });
    }

    create() {
        this.cursor = this.add.sprite(this.input.activePointer.x, this.input.activePointer.y, 'cursor');
        this.game.events.on('valid_hover', () => { this.cursor.setFrame(1) });
        this.game.events.on('no_hover', () => { this.cursor.setFrame(0) });
    }

    update() {
       this.cursor.setPosition(this.input.activePointer.x, this.input.activePointer.y);
    }
}

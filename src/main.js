import { Menu } from './scenes/Menu.js';
import { Bootup } from './scenes/Bootup.js';
import { Desktop } from './scenes/Desktop.js';
import { Canvas } from './scenes/Canvas.js';
import { RetroDisplay } from '../retrozone/src/index.js';

let config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    physics: { 
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Menu, Bootup, Desktop, Canvas],
}

export let game = new Phaser.Game(config);

// Apply retrozone shader to canvas. Code snippet and shader grabbed from https://github.com/TheMarco/retrozone
    setTimeout(() => {
        const display = new RetroDisplay(game.canvas, {
            mode: 'vector',
            persist: true,
        });
    }, 100);
// The following object literal was AI generated. https://claude.ai/share/7c9f727e-54c5-4102-ac67-f6de329d0c0e
    export const globals = {
        height: game.config.height,
        width: game.config.width,

        // Textbox configuration constants
        get TEXTBOX_WIDTH() { return this.width * 0.55; },
        get TEXTBOX_HEIGHT() { return this.height * 0.3; },
        TEXTBOX_PADDING: 20,

        // Submit button configuration constants
        SUBMIT_WIDTH: 150,
        SUBMIT_HEIGHT: 50,
        get SUBMIT_X() { return this.TEXTBOX_WIDTH * 0.5 - this.SUBMIT_WIDTH * 0.5; },
        get SUBMIT_Y() { return this.height * 0.45; },

        COLORS: {
            BLUE: 0x1f7c9e
        },
};

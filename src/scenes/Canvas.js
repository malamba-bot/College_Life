/* CHANGES TBM: change plugin load method
    */
class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    preload() {
        // Yoinked from https:/rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-textbox/
        // Load the textbox plugin from the internet (relies on the github being active) 
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }

    create() {
        this.add.text(width/2, height/2, 'This be the Canvas scene');
        this.textBox = this.rexUI.add.textBox();

    }
}

class Canvas extends Phaser.Scene {
    constructor() {
        super('Canvas');
    }

    preload() {
    }

    create() {
        //this.add.text(width/2, height/2, 'This be the Canvas scene');
        this.add.interactiveTextBox(100,  200);
        console.log(this.sys.displayList.list);

    }
}

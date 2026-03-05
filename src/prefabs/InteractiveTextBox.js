class InteractiveTextBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config = {
        height: 100,
        width : 100,
        color: 0xffffff}) {
        super(scene, x, y);

        // Save config
        this.config = config;

        // Add background
        this.scene.add.rectangle(x, y, this.config.width, this.config.height, this.config.color);
    }

}

// Register this object with Phaser's object factory
Phaser.GameObjects.GameObjectFactory.register('interactiveTextBox', function (x, y, config) {
    return this.displayList.add(new InteractiveTextBox(this.scene, x, y, config));
});


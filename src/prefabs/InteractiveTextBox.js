const default_config = {
    height: 100,
    width : 100,
    color: 0xffffff,
    stroke_thickness: 5,
    stroke_color: 0xffffff,
    stroke_alpha: 1
}

class InteractiveTextBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y);

        // Merge default and user-supplied config
        this.config = {...default_config, ...config };

        // Add background
        this.background = this.scene.add.rectangle(x, y, this.config.width, this.config.height, this.config.color, this.config.alpha);
        console.log(this.config.stroke_thickness);
        this.background.setStrokeStyle(this.config.stroke_thickness, this.config.stroke_color, this.config.stroke_alpha);
    }

}

// Register this object with Phaser's object factory
Phaser.GameObjects.GameObjectFactory.register('interactiveTextBox', function (x, y, config) {
    return this.displayList.add(new InteractiveTextBox(this.scene, x, y, config));
});


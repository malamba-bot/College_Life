class InteractiveTextBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        console.log("I am inside the class");
        scene.add.rectangle(x, y, 200, 200, 0x333333);
    }

}

// Register this object with Phaser's object factory
Phaser.GameObjects.GameObjectFactory.register('interactiveTextBox', function (x, y) {
    return this.displayList.add(new InteractiveTextBox(this.scene, x, y));
});

const default_config = {
    height: 100,
    width : 100,
    color: 0xffffff,
    stroke_thickness: 5,
    stroke_color: 0xffffff,
    stroke_alpha: 1,
    text_padding: 0,
    // TODO add text options here?
}

class InteractiveTextBox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y);

        // Merge default and user-supplied config
        this.config = {...default_config, ...config };

        this.add_background(x, y);
        this.text = "gurllasdjfhaskdjfh";
 
        this.scene.input.keyboard.on('keydown', (key_pressed) => {
            // TODO console.log(`Pressed ${key_pressed.key}`);
            const key = key_pressed.key;
            if (key == 'Backspace') {
                // Yoinked from https://stackoverflow.com/questions/952924/how-do-i-chop-slice-trim-off-last-character-in-string-using-javascript
                // Removes last char in a string
                this.text = this.text.slice(0, -1);
            } else if (key == 'Enter') {
                this.text += ("\n");
            } else if (key.length === 1) // Printable keys have length of 1
                this.text += key;
        });

        this.text_obj = scene.add.text(x - this.config.width / 2, y - this.config.height / 2, this.text, {
            fontSize: '48px',
            padding: {
                right: this.config.text_padding,
                left: this.config.text_padding,
                top: this.config.text_padding,
                bottom: this.config.text_padding,
            },
            fixedWidth: this.config.width - this.config.text_padding
        }).setOrigin(0);

        // Configure word wrapping
        this.text_obj.setWordWrapWidth(this.config.width - this.config.text_padding);
    }

    add_background(x, y) {
        this.background = this.scene.add.rectangle(x, y, this.config.width, this.config.height, this.config.color, this.config.alpha);
        this.background.setStrokeStyle(this.config.stroke_thickness, this.config.stroke_color, this.config.stroke_alpha);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.text_obj.setText(this.text);
    }

}


// Register this object with Phaser's object factory
Phaser.GameObjects.GameObjectFactory.register('interactiveTextBox', function (x, y, config) {
    return this.displayList.add(new InteractiveTextBox(this.scene, x, y, config));
});


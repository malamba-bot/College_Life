// TODO add mousepad scrolling support
const default_config = {
    height: 100,
    width : 100,
    color: 0xffffff,
    alpha: 1,
    stroke_thickness: 5,
    stroke_color: 0xffffff,
    stroke_alpha: 1,
    text_padding: 0,
    text_size: 48,
    text_line_spacing: 0
    // TODO add text options here?
}

class InteractiveTextBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y);

        // Merge default and user-supplied config
        this.config = {...default_config, ...config };
        this.active = false;

        this.add_background();
        this.configure_text();
        this.add_mask(x, y);
        this.add_listeners();
    }

    add_listeners() {
        // Add a listener for keyboard input
        this.keyboard_listener = this.scene.input.keyboard.on('keydown', (key_pressed) => {
            if (this.active) {
                const key = key_pressed.key;
                // Prevent browser from going to prev page on backspace
                key_pressed.preventDefault();
                if (key == 'Backspace') {
                    // Yoinked from https://stackoverflow.com/questions/952924/how-do-i-chop-slice-trim-off-last-character-in-string-using-javascript
                    // Removes last char in a string
                    this.text = this.text.slice(0, -1);
                } else if (key == "Escape") {
                    this.active = false;
                } else if (key == 'Enter') {
                    this.text += ("\n");
                } else if (key.length === 1) // Printable keys have length of 1
                this.text += key;
            }
            this.text_obj.setText(this.text);
            // Scroll if text is offscreen
            this.scroll_if_text_offscreen();
        });

        this.text_init_y = -this.config.height / 2;
        var new_text_y;

        this.scroll_wheel_listener = this.scene.input.on('wheel', (pointer, dx, dy, dz) => {
            if (this.active) {
                // Clamp the scroll between the top and bottom lines
                new_text_y = Phaser.Math.Clamp(
                    this.text_obj.y + ( dz / Math.abs(dz) ) * this.config.text_size,
                    // Scroll text according to text size
                    this.text_obj.height < this.config.height ? text_init_y : text_init_y - ( this.text_obj.height - this.config.height ), 
                    text_init_y
                );

                this.text_obj.y = new_text_y;
            }
        });
    }

    add_background() {
        this.background = this.scene.add.rectangle(0, 0, this.config.width, this.config.height, this.config.color);
        this.background.setStrokeStyle(this.config.stroke_thickness, this.config.stroke_color, this.config.stroke_alpha, this.config.alpha);

        // Add background to container
        this.add(this.background);
    }

    configure_text() {
        this.text = "";
        this.text_obj = this.scene.add.text(0, -this.config.height / 2, this.text, {
            fontSize: this.config.text_size,
            padding: {
                right: this.config.text_padding,
                left: this.config.text_padding,
                top: this.config.text_padding,
                bottom: this.config.text_padding,
            },
            fixedWidth: this.config.width,
            backgroundColor: null,
            lineSpacing: this.config.text_line_spacing,
        }).setOrigin(0.5, 0);

        // Configure word wrapping
        this.text_obj.setWordWrapWidth(this.config.width - this.config.text_padding);

        this.add(this.text_obj);
    }

    add_mask(x, y) {
        var rectangle = this.scene.add.rectangle(x, y, this.config.width, this.config.height - ( this.config.text_padding * 2 ), 0);
        this.mask = rectangle.createGeometryMask();
        this.text_obj.setMask(this.mask);
        this.setMask(null);
    }

    scroll_if_text_offscreen() {
        // Scroll down if there is text below cutoff
        if (this.text_obj.y + this.text_obj.height  > this.text_init_y + this.config.height ) {
            this.text_obj.y = this.text_init_y + this.config.height - this.text_obj.height - this.config.text_padding;
        // Scroll up if there is text is above cuttoff
        } else if (this.text_obj.y + this.text_obj.height < this.text_init_y + this.config.text_padding + this.config.text_size) {
            if (this.text_obj.height > this.config.height) {
            this.text_obj.y = this.text_init_y + this.config.height - ( this.text_obj.height );
            } else {
                console.log("special trigger");
                this.text_obj.y = this.text_init_y;
            }
        }
    }

    preUpdate(time, delta) {
        // TODO
    }

    setInteractive() {
        // Make the background box interactive
        this.background.setInteractive({cursor: 'pointer'});
        // Activate the textbox on click
        this.background.on('pointerdown', () => {
            this.active = true;
        })
    }

    destroy() {
        // Override destory method to get rid of listeners
        this.keyboard_listener.removeListener('keydown');
        this.scroll_wheel_listener.removeListener('wheel');

        this.mask.destroy();

        // Call default container destructor
        super.destroy()
    }
}


// Register this object with Phaser's object factory
// Allows scene to create an iTextBox using this.add.interactiveTextBox, adding it to display list
// Parameters define the key and the function which will when when this.add.<key> is called
Phaser.GameObjects.GameObjectFactory.register('interactiveTextBox', function (x, y, config) {
    return this.displayList.add(new InteractiveTextBox(this.scene, x, y, config));
});


const default_config = {
    height: 100,
    width : 100,
    color: 0xffffff,
    alpha: 1,
    radius: 1,
    stroke_thickness: 5,
    stroke_color: 0xffffff,
    stroke_alpha: 1,
    font_family: 'Helvetica',
    text_color: '#000000',
    text_padding: 0,
    font_size: 48,
    text_line_spacing: 0,
    text_stroke_thickness: 0,
    text_stroke_color: null,
    cursor_thickness: 2
}

class InteractiveTextBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y);

        // Merge default and user-supplied config
        this.config = {...default_config, ...config };
        this.interactive = false;
        this.active = false;
        this.timers = [];

        this.#add_background();
        this.#configure_text();
        this.#add_cursor();
        this.#add_mask(x, y);
    }

    setText(text) {
        this.text = text;
        this.text_obj.setText(this.text);
        this.#scroll_if_text_offscreen();
        this.#update_cursor();
    }

    typeText(text, delay = 50) {
        // Split string into individual chars, and then print each with a delay
        text.split('').forEach((c, i) => {
            this.timers.push(
                this.scene.time.delayedCall(i * delay, () => {
                    this.setText(this.text + c);
                })
            )
        })
    }

    setInteractive() {
        // Do not create multiple instances of listeners
        if (this.interactive) return;

        this.ineractive = true;

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
                    this.cursor.visible = false;
                } else if (key == 'Enter') {
                    this.text += ("\n");
                } else if (key == "Tab") {
                    this.text += ("\t");
                } else if (key.length === 1) { // Printable keys have length of 1
                    this.text += key;
                }
            }
            this.setText(this.text);
        });

        this.text_init_y = -this.config.height / 2;
        var new_text_y;

        this.scroll_wheel_listener = this.scene.input.on('wheel', (pointer, dx, dy, dz) => {
            if (this.active) {
                // Clamp the scroll between the top and bottom lines
                new_text_y = Phaser.Math.Clamp(
                    this.text_obj.y + ( dz / Math.abs(dz) ) * this.config.font_size,
                    // Scroll text according to text size
                    this.text_obj.height < this.config.height ? this.text_init_y : this.text_init_y - ( this.text_obj.height - this.config.height ),
                    this.text_init_y
                );

                this.text_obj.y = new_text_y;
                this.#update_cursor();
            }
        });

        // Make the background box interactive
        this.background.setInteractive({cursor: 'pointer'});

        // Activate on click and deactivate on click outside bounds
        this.click_listener = this.scene.input.on('pointerdown', (pointer) => {
            const bounds = this.background.getBounds();
            if (bounds.contains(pointer.x, pointer.y)) {
                this.active = true;
                this.cursor.visible = true;
            } else {
                this.active = false;
                this.cursor.visible = false;
            }
        });
    }

    #update_cursor() {
        // Set the cur_line text to the last wrapped line
        const last_line = this.text_obj.getWrappedText().at(-1);
        this.cur_line.setText(last_line);

        // Update cursor position
        this.cursor.x = this.cur_line.x + this.cur_line.width - this.config.text_padding;
        this.cursor.y = this.text_obj.y + this.text_obj.height - this.config.text_padding;
    }

    #add_cursor() {
        this.cursor = this.scene.add.rectangle(this.text_obj.x + this.config.text_padding, 
            this.text_obj.y + this.text_obj.height - this.config.text_padding,
            this.config.cursor_thickness, 
            this.config.font_size, 
            0x000000).setOrigin(0, 1);
        this.cursor.visible = false;
        this.add(this.cursor);
    }

    #add_listeners() {
    }

    #add_background() {
        this.background = this.scene.add.rectangle(0, 0, this.config.width, this.config.height, this.config.color, this.config.alpha);
        this.background.setStrokeStyle(this.config.stroke_thickness, this.config.stroke_color, this.config.stroke_alpha);
        this.background.setRounded(this.config.radius);

        // Add background to container
        this.add(this.background);
    }

    #configure_text() {
        this.text = "";

        // Set the padding to a minumum of the border thickness to avoid overlap
        if (this.config.text_padding < this.config.stroke_thickness) {
            this.config.text_padding = this.config.stroke_thickness;
        }

        // Make sure radius is not 0 (causes visual bug)
        if (this.config.radius < 1) {
            this.config.radius = 1;
        }

        let text_config = {
            fontFamily: this.config.font_family,
            fontSize: this.config.font_size,
            color: this.config.text_color,
            strokeThickness: this.config.text_stroke_thickness,
            stroke: this.config.text_stroke_color,
            backgroundColor: null,
            lineSpacing: this.config.text_line_spacing,
            padding: {
                x: this.config.text_padding,
                y: this.config.text_padding,
            },
            wordWrap: {
                width: this.config.width - this.config.text_padding * 2,
            }
        }
        this.text_obj = this.scene.add.text(-this.config.width / 2, -this.config.height / 2, this.text, text_config).setOrigin(0);

        // Create an invisible text object to keep track of the proper cursor position
        this.cur_line = this.scene.add.text(this.text_obj.x, this.text_obj.y, this.text, text_config).setOrigin(0);
        this.cur_line.visible = false;

        this.add(this.text_obj);
        this.add(this.cur_line);
    }

    #add_mask(x, y) {
        const total_padding = this.config.text_padding * 2;
        var rectangle = this.scene.add.rectangle(x, y, this.config.width - total_padding, this.config.height - total_padding, 0);
        this.mask = rectangle.createGeometryMask();
        this.text_obj.setMask(this.mask);
        this.cursor.setMask(this.mask);
        this.setMask(null);
        rectangle.destroy();
    }

    #scroll_if_text_offscreen() {
        // Scroll down if there is text below cutoff
        if (this.text_obj.y + this.text_obj.height  > this.text_init_y + this.config.height ) {
            this.text_obj.y = this.text_init_y + this.config.height - this.text_obj.height - this.config.text_padding;
        // Scroll up if there is text is above cuttoff
        } else if (this.text_obj.y + this.text_obj.height < this.text_init_y + this.config.text_padding + this.config.font_size) {
            if (this.text_obj.height > this.config.height) {
            this.text_obj.y = this.text_init_y + this.config.height - ( this.text_obj.height );
            } else {
                this.text_obj.y = this.text_init_y;
            }
        }
    }

    destroy() {
        // Override destory method to get rid of listeners
        if (this.interactive) {
            this.keyboard_listener.removeListener('keydown');
            this.scroll_wheel_listener.removeListener('wheel');
            this.click_listener.removeListener('pointerdown');
        }

        // Destroy all timers
        this.timers.forEach( (t) => t.remove());

        // Call default container destructor
        super.destroy()
    }
}


// Register this object with Phaser's object factory
// Allows scene to create an iTextBox using this.add.interactiveTextBox, adding it to display list
// Parameters define the key and the function which will be run when when this.add.<key> is called
Phaser.GameObjects.GameObjectFactory.register('interactiveTextBox', function (x, y, config) {
    return this.displayList.add(new InteractiveTextBox(this.scene, x, y, config));
});

export default InteractiveTextBox;

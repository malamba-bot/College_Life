this.scroll_wheel_listener = 
    this.scene.input.on('wheel', (pointer, dx, dy, dz) => {
    if (this.active) {
        new_text_y = Phaser.Math.Clamp(
            this.text_obj.y + ( dz / Math.abs(dz) ) * this.config.font_size,
            // Scroll text according to text size
            this.text_obj.height < this.config.height ? 
            this.text_init_y : 
            this.text_init_y - ( this.text_obj.height - this.config.height ),
            this.text_init_y
        );

        this.text_obj.y = new_text_y;
        this.#update_cursor();
    }
});







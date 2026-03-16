const questions = {
    one:
`#include <stdio.h>\n
int main(void) {
	printf("Hello, world!\\n");
}`,
    two:
`List newList() {
	List newList = malloc(sizeof(ListObj));
	assert(newList != NULL);
	newList->front = newList->back 
		= newList->cursor = NULL;
	newList->cursorPos = -1;
	newList->length = 0;
	return newList;
}`,
    three:
`this.scroll_wheel_listener = 
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
});`,
    four:
`class Water_Pipeline extends 
	Phaser.Renderer.WebGL.Pipelines.PreFXPipeline {
	constructor(game, scene) {
		super({
			game,
			fragShader:\` 
			precision mediump float;
			uniform float time;
			uniform sampler2D uMainSampler; 
			uniform float scrollY;
			uniform float y_resolution;
			varying vec2 outTexCoord; 
			void main() {
				vec2 uv = outTexCoord;
				uv.x += sin(uv.y * 10.0 + time * 3.0) * 0.01; 
				uv.y += cos(uv.x * 10.0 + time * 2.0) * 0.005;
				uv.y = fract(uv.y + scrollY / y_resolution);
				gl_FragColor = texture2D(uMainSampler, uv);
			}\`});`
}


export default questions;

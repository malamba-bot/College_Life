class Water_Pipeline extends 
    Phaser.Renderer.WebGL.Pipelines.PreFXPipeline {
    constructor(game, scene) {
        super({
            game,
            fragShader:` 
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
            }`});
        this.scene = scene;
    }

        onPreRender() {
            super.onPreRender();
            this.set1f('time', this.scene.time.now / 1000);
        }

    }



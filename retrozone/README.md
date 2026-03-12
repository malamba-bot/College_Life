# RetroZone

Retro CRT and Vector display engine for HTML5 games. Applies authentic post-processing effects to any canvas — phosphor glow, scanlines, bloom, barrel distortion, and more — via WebGL shaders.

Two display modes, zero game-engine lock-in:

- **Vector Mode** — Blue phosphor CRT with multi-pass bloom, per-channel persistence trails, chromatic aberration, and grain
- **CRT Mode** — 256×224 NTSC simulation with gaussian beam scanlines, Trinitron aperture grille, halation, warm color temperature, and interlace flicker

## Quick Start

```bash
npm install retrozone
```

### Minimal Example (any canvas)

The core display engine has **zero dependencies** — it works with any canvas element.

```js
import { RetroDisplay } from 'retrozone';

// Your game renders to a regular canvas
const canvas = document.querySelector('#my-game-canvas');

// RetroZone applies display effects on top
const display = new RetroDisplay(canvas);

// Switch modes at runtime
display.setMode('crt');    // NTSC CRT simulation
display.setMode('vector'); // Vector phosphor display

// Tune phosphor trails (vector mode only)
display.setPhosphorDecay(0.85); // longer trails

// Clean up when done
display.destroy();
```

### With Phaser 3

RetroZone includes rendering utilities designed for Phaser's Graphics API:

```js
import Phaser from 'phaser';
import {
  RetroDisplay,
  createProjection,
  drawGlowLine,
  drawGlowCircle,
  vectorText,
  ExplosionRenderer,
  FIGHTER, // example wireframe model
} from 'retrozone';

class GameScene extends Phaser.Scene {
  create() {
    // Graphics object with additive blending for glow
    this.gfx = this.add.graphics();
    this.gfx.setBlendMode(Phaser.BlendModes.ADD);

    // 3D projection system
    this.projection = createProjection({
      centerX: 400,
      centerY: 300,
      perspective: 0.006,
    });

    // Explosion system
    this.explosions = new ExplosionRenderer();
  }

  update(time, delta) {
    this.gfx.clear();

    // Draw a glowing line
    drawGlowLine(this.gfx, 100, 100, 300, 200, 0x44bbff);

    // Draw a glowing circle
    drawGlowCircle(this.gfx, 400, 300, 50, 0xff44ff);

    // Project and draw a 3D wireframe model
    const lines = this.projection.projectModel(
      FIGHTER, 400, 300, 10, 2.5, time / 1000
    );
    for (const seg of lines) {
      drawGlowLine(this.gfx, seg.x1, seg.y1, seg.x2, seg.y2, 0x44ff66);
    }

    // Update and draw explosions
    this.explosions.update(delta);
    this.explosions.draw(this.gfx);
  }
}

const game = new Phaser.Game({
  type: Phaser.WEBGL,
  width: 768,
  height: 672,
  scene: [GameScene],
});

// Apply display overlay after canvas is ready
setTimeout(() => {
  const display = new RetroDisplay(game.canvas, {
    mode: 'vector',
    persist: true,
  });
}, 100);
```

## Run the Demo

```bash
git clone <repo-url> retrozone
cd retrozone
npm install
npm run dev
```

Open `http://localhost:3000` — you'll see rotating wireframe models with glow effects. Click anywhere to spawn explosions. Toggle between Vector and CRT modes with the buttons below.

## Creating Graphics

RetroZone doesn't render game objects for you — it post-processes whatever you draw on your canvas. You draw bright shapes on a black background; the shader adds the glow, bloom, scanlines, and phosphor trails. This section explains how to build visuals that look great through the RetroZone pipeline.

### The Core Idea

Both display modes work best with **bright content on black**. Draw your game using any renderer you like — Canvas2D, Phaser, PixiJS, Three.js — and the shader overlay does the rest. Everything you draw gets the retro treatment automatically.

For Phaser games, set your Graphics object to **additive blending** so overlapping glow passes add light instead of obscuring each other:

```js
const gfx = this.add.graphics();
gfx.setBlendMode(Phaser.BlendModes.ADD);
```

### Drawing Glowing Lines and Shapes

The glow rendering functions draw each shape in three passes — a wide dim outer glow, a mid-width bloom, and a sharp bright core — to simulate the look of a phosphor beam:

```js
import { drawGlowLine, drawGlowCircle, drawGlowPolygon, drawGlowEllipse } from 'retrozone';

// Basic glowing line
drawGlowLine(gfx, 100, 50, 300, 50, 0x44bbff);

// Glowing circle (16 segments by default)
drawGlowCircle(gfx, 400, 300, 60, 0xff44ff);

// Closed polygon from point array
drawGlowPolygon(gfx, [
  { x: 200, y: 100 },
  { x: 250, y: 200 },
  { x: 150, y: 200 },
], 0x44ff66);

// Rotated ellipse
drawGlowEllipse(gfx, 400, 300, 80, 40, 0xffdd44, Math.PI / 6);
```

When shapes overlap and you want one to appear **solid** (not transparent), use the `mask` parameter. This draws a black fill behind the glow to block bleed-through:

```js
drawGlowLine(gfx, 100, 100, 300, 100, 0x44bbff, true);  // masked
drawGlowCircle(gfx, 400, 300, 50, 0xff44ff, 16, true);   // masked
```

### Defining Wireframe Models

Models are simple arrays of line segments in local 3D space, centered on the origin. Each segment has a `from` and `to` point as `[x, y, z]`:

```js
// A simple arrow shape
const ARROW = [
  { from: [0, -8, 0], to: [-4, 4, 0] },   // left edge
  { from: [0, -8, 0], to: [4, 4, 0] },     // right edge
  { from: [-4, 4, 0], to: [4, 4, 0] },     // base
];
```

Use **Z coordinates** to give models 3D depth — when the model rotates around the Y axis, parts with different Z values will shift convincingly:

```js
const SHIP_3D = [
  { from: [0, -10, -2], to: [-6, 6, 1] },   // left strut recedes
  { from: [0, -10, -2], to: [6, 6, 1] },     // right strut comes forward
  { from: [-6, 6, 1], to: [6, 6, 1] },       // base at positive Z
  { from: [-6, 6, 1], to: [-10, 2, 2] },     // left wing extends further forward
  { from: [6, 6, 1], to: [10, 2, 2] },       // right wing
];
```

Design tips:
- Keep coordinates roughly in the range -15 to 15 — the `modelScale` parameter handles sizing at render time
- Mirror left/right by negating X coordinates for symmetry
- Small Z offsets (0.5–2) are enough for subtle depth; larger values (3+) create dramatic rotation effects
- Test your model by rotating it — flat models (all Z=0) look fine in 2D but won't show depth when spinning

### Projecting Models to the Screen

The projection system transforms 3D model coordinates into 2D screen positions with perspective:

```js
import { createProjection, drawGlowLine, FIGHTER } from 'retrozone';

const projection = createProjection({
  centerX: 384,        // vanishing point (usually canvas center)
  centerY: 336,
  perspective: 0.006,  // depth scaling strength
});

// Project with full 3D perspective — great for Vector mode
const lines = projection.projectModel(
  FIGHTER,    // model data
  384, 336,   // world position (x, y)
  10,         // depth (z) — higher = further away = smaller
  2.5,        // scale multiplier
  angle       // Y-axis rotation in radians
);

for (const seg of lines) {
  drawGlowLine(gfx, seg.x1, seg.y1, seg.x2, seg.y2, 0x44bbff);
}
```

For **CRT mode** where you want crisp, uniform sprites without per-vertex perspective distortion, use the flat projection:

```js
const lines = projection.projectModelFlat(
  FIGHTER,    // model data
  384, 336,   // screen position
  3.0,        // uniform scale
  angle       // 2D rotation
);
```

Each projected segment includes `depth` and `scale` fields you can use for depth sorting or distance-based color fading:

```js
const projected = projection.projectModel(model, x, y, z, scale, rotation);
projected.sort((a, b) => b.depth - a.depth); // back-to-front

for (const seg of projected) {
  const brightness = Math.max(0.3, seg.scale); // fade distant lines
  gfx.lineStyle(2, 0x44bbff, brightness);
  // ...draw manually, or use drawGlowLine for the full glow treatment
}
```

### Rendering Text

The built-in vector font returns line segments you draw with your preferred method:

```js
import { vectorText, vectorTextWidth, drawGlowLine } from 'retrozone';

// Centered title
const title = 'GAME OVER';
const scale = 4;
const width = vectorTextWidth(title, scale);
const x = (canvasWidth - width) / 2;
const lines = vectorText(title, x, 100, scale);

for (const seg of lines) {
  drawGlowLine(gfx, seg.x1, seg.y1, seg.x2, seg.y2, 0xff4444);
}
```

For non-Phaser renderers, or when you want more control (like pulsing alpha), draw the segments directly:

```js
const alpha = 0.5 + Math.sin(time / 500) * 0.3;
for (const seg of lines) {
  gfx.lineStyle(1.5, 0x4488ff, alpha);
  gfx.beginPath();
  gfx.moveTo(seg.x1, seg.y1);
  gfx.lineTo(seg.x2, seg.y2);
  gfx.strokePath();
}
```

The font supports: **A–Z**, **0–9**, **space**, and **! - / : + .**

Character dimensions at scale 1: 4px wide, 6px tall. The `spacing` parameter (default 1) adds gap between characters in scale units.

### Adding Explosions

The explosion renderer produces radial line bursts that expand and fade:

```js
import { ExplosionRenderer } from 'retrozone';

const explosions = new ExplosionRenderer({
  particleCount: 14,    // lines per burst
  particleSpeed: 220,   // initial velocity (px/s)
  particleLifeMs: 900,  // duration before fade-out
  tailLength: 40,       // trail length in px
  lineWidth: 2.5,
});

// Spawn on event (e.g., enemy destroyed)
explosions.spawn(enemy.x, enemy.y, 0xff4466);

// In your update loop — must call both every frame
explosions.update(delta);   // delta in ms
explosions.draw(gfx);

// Check if anything is still animating
if (explosions.active) { /* ... */ }
```

### Working Without Phaser

The glow functions require Phaser's Graphics API, but the rest of the engine works with any canvas. For a pure Canvas2D game:

```js
import { RetroDisplay, createProjection, vectorText, FIGHTER } from 'retrozone';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const display = new RetroDisplay(canvas);
const projection = createProjection({ centerX: 400, centerY: 300 });

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw wireframe model with Canvas2D
  ctx.strokeStyle = '#44bbff';
  ctx.lineWidth = 2;
  const lines = projection.projectModel(FIGHTER, 400, 300, 10, 3, angle);
  for (const seg of lines) {
    ctx.beginPath();
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
    ctx.stroke();
  }

  // Draw vector text with Canvas2D
  ctx.strokeStyle = '#44ff66';
  ctx.lineWidth = 1.5;
  const textLines = vectorText('SCORE 1000', 20, 20, 2);
  for (const seg of textLines) {
    ctx.beginPath();
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}
draw();
```

The shader overlay reads your canvas as a texture each frame — it doesn't care how you drew to it. Draw bright lines on black and the CRT/vector effects will do the rest.

## API Reference

### `RetroDisplay`

The high-level display engine class. Works with **any** canvas — no framework required.

```js
const display = new RetroDisplay(canvas, options?)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | `'vector' \| 'crt'` | `'vector'` | Initial display mode |
| `phosphorDecay` | `number` | `0.78` | Phosphor trail persistence (0–1) |
| `persist` | `boolean` | `false` | Save/restore mode to localStorage |
| `storageKey` | `string` | `'retrozone-display-mode'` | localStorage key for persistence |

**Methods:**

| Method | Description |
|--------|-------------|
| `setMode(mode)` | Switch between `'vector'` and `'crt'` |
| `getMode()` | Returns current mode name |
| `setPhosphorDecay(v)` | Set trail persistence (0 = none, 0.78 = default, 0.95 = long) |
| `overlayCanvas` | The WebGL overlay canvas element (read-only) |
| `destroy()` | Stop rendering, remove overlay, free resources |

### `createShaderOverlay(canvas, options?)`

Low-level factory if you need direct control. Returns an object with `setShader()`, `getShaderName()`, `setPhosphorDecay()`, `destroy()`, and the `overlay` canvas element.

### `createProjection(config)`

Creates a 3D→2D projection system for wireframe rendering.

```js
const proj = createProjection({
  centerX: 400,  // vanishing point X
  centerY: 300,  // vanishing point Y
  perspective: 0.006, // depth scaling strength
});
```

**Returns:**

| Method | Description |
|--------|-------------|
| `projectPoint(x, y, z)` | Project a single 3D point → `{ x, y, scale }` |
| `getScale(z)` | Get scale factor at depth z |
| `projectModel(lines, x, y, z, scale, rotation)` | Full 3D perspective projection |
| `projectModelFlat(lines, sx, sy, scale, rotation)` | Flat 2D projection (no per-vertex perspective) |

### Glow Rendering (Phaser 3.x)

Multi-pass glow drawing functions. Pass a Phaser `Graphics` object set to `ADD` blend mode.

```js
import {
  drawGlowLine,      // (gfx, x1, y1, x2, y2, color, mask?, passes?)
  drawGlowPolygon,   // (gfx, points[], color, mask?)
  drawGlowDiamond,   // (gfx, cx, cy, size, color)
  drawGlowCircle,    // (gfx, cx, cy, radius, color, segments?, mask?)
  drawGlowEllipse,   // (gfx, cx, cy, rx, ry, color, rotation?, segments?, mask?)
  drawGlowArc,       // (gfx, cx, cy, rx, ry, color, rotation?, start?, end?, segments?)
  drawGlowDashedEllipse,
  drawGlowDashedLine,
  fillMaskRect,       // Opaque black fill helpers
  fillMaskCircle,
  fillMaskEllipse,
} from 'retrozone';
```

The `mask` parameter draws a black fill behind the glow to prevent bleed-through when objects overlap. Useful for sprites that should appear "solid" rather than transparent.

### `vectorText(text, x, y, scale, spacing?)`

Renders a string as an array of line segments using a built-in 5×7 vector stroke font.

```js
const lines = vectorText('HELLO', 100, 50, 3);
for (const seg of lines) {
  drawGlowLine(gfx, seg.x1, seg.y1, seg.x2, seg.y2, 0x44bbff);
}
```

Returns `Array<{ x1, y1, x2, y2 }>`. Supports A-Z, 0-9, and common punctuation.

### `vectorTextWidth(text, scale, spacing?)`

Returns the pixel width of a string at the given scale. Useful for centering.

### `ExplosionRenderer`

Pure vector line-burst explosions.

```js
const explosions = new ExplosionRenderer({
  particleCount: 14,    // lines per explosion
  particleSpeed: 220,   // initial speed (px/s)
  particleLifeMs: 900,  // lifetime in ms
  tailLength: 40,       // trail length in px
  lineWidth: 2.5,       // line thickness
});

// Spawn at position with color
explosions.spawn(400, 300, 0xff4466);

// In your update loop
explosions.update(delta);  // delta in ms
explosions.draw(gfx);      // Phaser Graphics object
```

### Wireframe Models

Pre-built 3D wireframe models for prototyping and demos. Each model is an array of `{ from: [x,y,z], to: [x,y,z] }` line segments.

```js
import { FIGHTER, MOTH, HORNET, CROWN, SPINNER, BEETLE, CRYSTAL, JELLYFISH, SPIDER, WARSHIP, BULLET, DART, MODELS } from 'retrozone';

// MODELS is a name→model lookup object
const model = MODELS['fighter'];
```

#### Defining Custom Models

```js
const MY_SHIP = [
  { from: [0, -10, 0], to: [-5, 5, 0] },
  { from: [0, -10, 0], to: [5, 5, 0] },
  { from: [-5, 5, 0], to: [5, 5, 0] },
  // Z coordinates add depth for 3D rotation
  { from: [0, -10, -2], to: [0, 5, 1] },
];

const projected = projection.projectModel(MY_SHIP, 400, 300, 10, 2.5, angle);
```

## Display Modes in Detail

### Vector Mode

A 5-pass WebGL pipeline simulating a monochrome blue phosphor vector CRT:

1. **Bloom downsample** — 4-tap bilinear downsample with soft brightness threshold
2. **Horizontal Gaussian blur** — 9-tap separable blur (sigma ~2.5)
3. **Vertical Gaussian blur** — Same kernel, perpendicular direction
4. **Vector composite** — Color grading → bloom add → chromatic aberration → phosphor grain → glass reflection → blue tint → analog noise → beam flicker → per-channel persistence with frame feedback
5. **Blit to screen** — Final output with Y-flip correction

Key visual features:
- Blue phosphor color grading (unsaturated/green content → blue; saturated content preserved with tint)
- Per-channel phosphor persistence with configurable decay (default 0.78)
- Edge beam defocus (softer at screen edges)
- Chromatic aberration proportional to edge distance
- Phosphor grain texture gated by intensity
- Glass surface reflection highlights
- Barrel distortion (4%) with rounded corners

### CRT Mode

A single-pass shader simulating a 256×224 NTSC consumer television:

- **Gaussian beam scanlines** with brightness-dependent bloom (bright pixels bloom wider)
- **NTSC horizontal bandwidth limiting** (sub-pixel blending)
- **Bloom extraction** (5-tap max-brightness sampling)
- **Halation** (diffuse glass glow at 3-pixel radius)
- **Trinitron aperture grille mask** (vertical RGB stripes with dark separators)
- **Warm color temperature** (1.04R, 1.01G, 0.95B)
- **Interlace flicker** (1.5% even/odd scanline alternation at 30Hz)
- **Barrel distortion** (4%) with rounded corners (15% radius)
- **Vignette** (12% edge darkening)
- **RGB static noise** (2.5%)
- **Power supply flicker** (triple-frequency sine wave, 8%)

All effects adapt to display density — looks great from desktop to phone.

## Architecture

```
┌──────────────────────────────────────────┐
│           Your Game / App                │
│  (renders to a regular HTML5 canvas)     │
└──────────────┬───────────────────────────┘
               │ canvas element
               ▼
┌──────────────────────────────────────────┐
│          RetroDisplay                    │
│  ┌─────────────────────────────────────┐ │
│  │       ShaderOverlay (WebGL)         │ │
│  │                                     │ │
│  │  Vector: 5-pass bloom + composite   │ │
│  │  CRT:    1-pass NTSC simulation     │ │
│  │                                     │ │
│  │  Reads game canvas as texture       │ │
│  │  Renders to overlay canvas on top   │ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘

Optional Phaser utilities:
  GlowRenderer      → multi-pass glow drawing
  Projection         → 3D wireframe projection
  VectorFont         → stroke font rendering
  ExplosionRenderer  → line-burst particles
  Models             → example wireframe models
```

The shader overlay creates a separate WebGL canvas positioned exactly over your game canvas. Your game renders normally; the overlay reads the game canvas as a texture each frame and applies post-processing effects in real-time. This means **RetroZone works with any renderer** — Phaser, PixiJS, Three.js, raw Canvas2D, or anything that draws to a canvas.

## Tips

- **Canvas size**: The CRT shader is tuned for a 256×224 virtual resolution. For best results, use a canvas that's a multiple of this (e.g., 768×672 = 3×). The Vector shader works well at any resolution.
- **Additive blending**: Set your Phaser Graphics to `ADD` blend mode for the best glow effect with the Vector shader. The shader's bloom and persistence multiply the glow beautifully.
- **Black backgrounds**: Both shaders expect bright content on a black background. Dark backgrounds work best.
- **Performance**: The Vector shader runs 5 passes per frame. On low-end devices, CRT mode (1 pass) is significantly lighter.
- **Phosphor decay**: Values around 0.75–0.85 give natural trails. Above 0.9, trails become very long and dreamy. Below 0.5, trails are barely visible.

## Browser Support

Requires WebGL 1.0. Works in all modern browsers (Chrome, Firefox, Safari, Edge). Mobile browsers are supported — the shaders adapt their effect intensity to display density.

## License

MIT

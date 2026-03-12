/**
 * RetroZone Demo — showcases CRT and Vector display modes.
 *
 * Features:
 *   - 3x3 grid of rotating wireframe models
 *   - Vector font text rendering
 *   - Starfield background
 *   - Click/tap anywhere to spawn explosions
 *   - Toggle between Vector and CRT display modes
 */
import Phaser from 'phaser';
import {
  RetroDisplay,
  createProjection,
  vectorText,
  vectorTextWidth,
  drawGlowLine,
  ExplosionRenderer,
  FIGHTER, MOTH, HORNET, CROWN, SPINNER,
  BEETLE, CRYSTAL, JELLYFISH, WARSHIP,
} from '../src/index.js';

const WIDTH = 768;
const HEIGHT = 672;

const MODELS = [
  { model: FIGHTER,   name: 'FIGHTER',   color: 0x44bbff },
  { model: MOTH,      name: 'MOTH',      color: 0x44ff66 },
  { model: HORNET,    name: 'HORNET',    color: 0xff6644 },
  { model: CROWN,     name: 'CROWN',     color: 0xffdd44 },
  { model: SPINNER,   name: 'SPINNER',   color: 0xff44ff },
  { model: BEETLE,    name: 'BEETLE',    color: 0xff8822 },
  { model: CRYSTAL,   name: 'CRYSTAL',   color: 0x44ffff },
  { model: JELLYFISH, name: 'JELLYFISH', color: 0x8866ff },
  { model: WARSHIP,   name: 'WARSHIP',   color: 0xff4488 },
];

const COLORS = [
  0x44bbff, 0x44ff66, 0xff6644, 0xffdd44,
  0xff44ff, 0xff8822, 0x44ffff, 0x8866ff, 0xff4488,
];

class DemoScene extends Phaser.Scene {
  constructor() {
    super('DemoScene');
  }

  create() {
    this.gfx = this.add.graphics();
    this.gfx.setBlendMode(Phaser.BlendModes.ADD);

    this.projection = createProjection({
      centerX: WIDTH / 2,
      centerY: HEIGHT / 2,
      perspective: 0.006,
    });

    this.explosions = new ExplosionRenderer();

    // Starfield
    this.stars = [];
    for (let i = 0; i < 120; i++) {
      this.stars.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        speed: 8 + Math.random() * 20,
        brightness: 0.15 + Math.random() * 0.35,
      });
    }

    // Model rotation angles
    this.rotations = MODELS.map(() => Math.random() * Math.PI * 2);

    // Click/tap to explode
    this.input.on('pointerdown', (pointer) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.explosions.spawn(pointer.x, pointer.y, color, 18);
    });

    this.elapsed = 0;
  }

  update(time, delta) {
    this.elapsed += delta;
    this.gfx.clear();

    this._drawStarfield(delta);
    this._drawTitle();
    this._drawModels(delta);
    this._drawFooter();

    this.explosions.update(delta);
    this.explosions.draw(this.gfx);
  }

  _drawStarfield(delta) {
    const dt = delta / 1000;
    for (const star of this.stars) {
      star.y += star.speed * dt;
      if (star.y > HEIGHT) {
        star.y = 0;
        star.x = Math.random() * WIDTH;
      }
      this.gfx.lineStyle(1.5, 0x334466, star.brightness);
      this.gfx.beginPath();
      this.gfx.moveTo(star.x, star.y);
      this.gfx.lineTo(star.x, star.y + 2);
      this.gfx.strokePath();
    }
  }

  _drawTitle() {
    const title = 'RETROZONE';
    const titleScale = 6;
    const titleW = vectorTextWidth(title, titleScale);
    const titleX = (WIDTH - titleW) / 2;
    const titleY = 30;
    const titleLines = vectorText(title, titleX, titleY, titleScale);

    for (const line of titleLines) {
      drawGlowLine(this.gfx, line.x1, line.y1, line.x2, line.y2, 0x44bbff);
    }

    // Subtitle
    const sub = 'DISPLAY ENGINE';
    const subScale = 2.5;
    const subW = vectorTextWidth(sub, subScale);
    const subX = (WIDTH - subW) / 2;
    const subLines = vectorText(sub, subX, titleY + titleScale * 7 + 10, subScale);

    for (const line of subLines) {
      drawGlowLine(this.gfx, line.x1, line.y1, line.x2, line.y2, 0x336699);
    }
  }

  _drawModels(delta) {
    const cols = 3;
    const rows = 3;
    const gridW = 600;
    const gridH = 380;
    const startX = (WIDTH - gridW) / 2 + gridW / (cols * 2);
    const startY = 150;
    const cellW = gridW / cols;
    const cellH = gridH / rows;

    for (let i = 0; i < MODELS.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = startX + col * cellW;
      const cy = startY + row * cellH + 20;

      // Rotate
      const speedMul = 0.5 + (i % 3) * 0.3;
      this.rotations[i] += (delta / 1000) * speedMul;

      const { model, name, color } = MODELS[i];
      const modelScale = 2.2;
      const z = 10 + Math.sin(this.elapsed / 1000 + i) * 3;

      const projected = this.projection.projectModel(
        model, cx, cy, z, modelScale, this.rotations[i]
      );

      for (const seg of projected) {
        drawGlowLine(this.gfx, seg.x1, seg.y1, seg.x2, seg.y2, color);
      }

      // Model name below
      const nameScale = 1.5;
      const nameW = vectorTextWidth(name, nameScale);
      const nameLines = vectorText(name, cx - nameW / 2, cy + 42, nameScale);
      for (const line of nameLines) {
        this.gfx.lineStyle(1.5, color, 0.5);
        this.gfx.beginPath();
        this.gfx.moveTo(line.x1, line.y1);
        this.gfx.lineTo(line.x2, line.y2);
        this.gfx.strokePath();
      }
    }
  }

  _drawFooter() {
    const text = 'CLICK ANYWHERE TO EXPLODE';
    const scale = 2;
    const w = vectorTextWidth(text, scale);
    const lines = vectorText(text, (WIDTH - w) / 2, HEIGHT - 50, scale);

    // Pulsing alpha
    const pulse = 0.4 + Math.sin(this.elapsed / 500) * 0.3;

    for (const line of lines) {
      this.gfx.lineStyle(1.5, 0x4488ff, pulse);
      this.gfx.beginPath();
      this.gfx.moveTo(line.x1, line.y1);
      this.gfx.lineTo(line.x2, line.y2);
      this.gfx.strokePath();
    }
  }
}

// ── Boot ──

const game = new Phaser.Game({
  type: Phaser.WEBGL,
  parent: 'game-container',
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: 0x000000,
  scene: [DemoScene],
  render: {
    pixelArt: false,
    antialias: true,
  },
});

// Apply RetroZone display overlay
setTimeout(() => {
  const display = new RetroDisplay(game.canvas, {
    mode: 'vector',
    persist: true,
  });

  // Wire up toggle buttons
  const currentMode = display.getMode();
  document.querySelectorAll('#mode-toggle button').forEach(btn => {
    if (btn.dataset.mode === currentMode) btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelector('#mode-toggle .active')?.classList.remove('active');
      btn.classList.add('active');
      display.setMode(btn.dataset.mode);
    });
  });
}, 100);

/**
 * Vector explosion renderer — radial line bursts that expand and decay.
 * No particles, no sprites — pure vector lines.
 *
 * Works with any Phaser 3.x Graphics object, or any object implementing
 * lineStyle(), beginPath(), moveTo(), lineTo(), strokePath().
 */

const DEFAULTS = {
  particleCount: 14,
  particleSpeed: 220,
  particleLifeMs: 900,
  tailLength: 40,
  lineWidth: 2.5,
};

/**
 * Convert 0xRRGGBB color to a brightened version.
 */
function brightenColor(color, factor = 1.3) {
  const r = Math.min(255, Math.round(((color >> 16) & 0xff) * factor));
  const g = Math.min(255, Math.round(((color >> 8) & 0xff) * factor));
  const b = Math.min(255, Math.round((color & 0xff) * factor));
  return (r << 16) | (g << 8) | b;
}

export class ExplosionRenderer {
  /**
   * @param {Object} [options] - Override default explosion parameters
   * @param {number} [options.particleCount=14]
   * @param {number} [options.particleSpeed=220]
   * @param {number} [options.particleLifeMs=900]
   * @param {number} [options.tailLength=40]
   * @param {number} [options.lineWidth=2.5]
   */
  constructor(options = {}) {
    this.config = { ...DEFAULTS, ...options };
    this.explosions = [];
  }

  /**
   * Spawn a new explosion at (x, y).
   * @param {number} x - Center X
   * @param {number} y - Center Y
   * @param {number} color - 0xRRGGBB color
   * @param {number} [count] - Override particle count for this explosion
   */
  spawn(x, y, color, count) {
    const n = count ?? this.config.particleCount;
    const particles = [];
    const brightColor = brightenColor(color);

    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = this.config.particleSpeed * (0.5 + Math.random() * 0.8);

      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: brightColor,
        length: 0.8 + Math.random() * 0.6,
      });
    }
    this.explosions.push({ particles, elapsed: 0 });
  }

  /**
   * Update all active explosions.
   * @param {number} delta - Time elapsed in milliseconds
   */
  update(delta) {
    const dt = delta / 1000;
    for (const exp of this.explosions) {
      exp.elapsed += delta;
      for (const p of exp.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.98;
        p.vy *= 0.98;
      }
    }
    this.explosions = this.explosions.filter(e => e.elapsed < this.config.particleLifeMs);
  }

  /**
   * Draw all active explosions.
   * @param {Phaser.GameObjects.Graphics} gfx - Graphics object with lineStyle/beginPath/moveTo/lineTo/strokePath
   */
  draw(gfx) {
    for (const exp of this.explosions) {
      const lifeRatio = 1 - exp.elapsed / this.config.particleLifeMs;
      if (lifeRatio <= 0) continue;
      const alpha = lifeRatio * lifeRatio;

      for (const p of exp.particles) {
        const tailLen = this.config.tailLength * p.length;
        const tailX = p.x - (p.vx / this.config.particleSpeed) * tailLen;
        const tailY = p.y - (p.vy / this.config.particleSpeed) * tailLen;

        gfx.lineStyle(this.config.lineWidth, p.color, alpha);
        gfx.beginPath();
        gfx.moveTo(tailX, tailY);
        gfx.lineTo(p.x, p.y);
        gfx.strokePath();
      }
    }
  }

  /** Returns true if any explosions are still active. */
  get active() {
    return this.explosions.length > 0;
  }

  /** Clear all active explosions. */
  clear() {
    this.explosions = [];
  }
}

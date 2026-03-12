/**
 * Multi-pass glow line/polygon drawing for vector aesthetic.
 * All functions operate on a Phaser Graphics object.
 *
 * Requires Phaser 3.x — these functions draw glowing vector lines
 * using Phaser's Graphics API with additive blending and multiple
 * width passes to create an authentic phosphor glow effect.
 */

const GLOW_PASSES = [
  { width: 11, alpha: 0.07 },  // wide outer glow
  { width: 5.5, alpha: 0.2 },  // mid-glow
  { width: 2, alpha: 1.0 },    // sharp core
];

/**
 * Draw a glowing line segment.
 * @param {Phaser.GameObjects.Graphics} gfx - Phaser Graphics object (should use ADD blend mode)
 * @param {number} x1 - Start X
 * @param {number} y1 - Start Y
 * @param {number} x2 - End X
 * @param {number} y2 - End Y
 * @param {number} color - Line color as 0xRRGGBB
 * @param {boolean} [mask=false] - Draw black mask behind to prevent bleed-through
 * @param {Array} [passes=GLOW_PASSES] - Custom glow pass configuration
 */
export function drawGlowLine(gfx, x1, y1, x2, y2, color, mask = false, passes = GLOW_PASSES) {
  if (mask) {
    const prevBlend = gfx.defaultBlendMode;
    gfx.setBlendMode(0); // NORMAL
    gfx.lineStyle(20, 0x000000, 1.0);
    gfx.beginPath();
    gfx.moveTo(x1, y1);
    gfx.lineTo(x2, y2);
    gfx.strokePath();
    gfx.setBlendMode(prevBlend);
  }

  for (const pass of passes) {
    gfx.lineStyle(pass.width, color, pass.alpha);
    gfx.beginPath();
    gfx.moveTo(x1, y1);
    gfx.lineTo(x2, y2);
    gfx.strokePath();
  }
}

/**
 * Draw a glowing closed polygon.
 * @param {Phaser.GameObjects.Graphics} gfx
 * @param {Array<{x: number, y: number}>} points
 * @param {number} color - 0xRRGGBB
 * @param {boolean} [mask=false]
 */
export function drawGlowPolygon(gfx, points, color, mask = false) {
  if (mask) {
    const prevBlend = gfx.defaultBlendMode;
    gfx.setBlendMode(0);
    gfx.lineStyle(20, 0x000000, 1.0);
    gfx.beginPath();
    gfx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      gfx.lineTo(points[i].x, points[i].y);
    }
    gfx.closePath();
    gfx.strokePath();
    gfx.setBlendMode(prevBlend);
  }

  for (const pass of GLOW_PASSES) {
    gfx.lineStyle(pass.width, color, pass.alpha);
    gfx.beginPath();
    gfx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      gfx.lineTo(points[i].x, points[i].y);
    }
    gfx.closePath();
    gfx.strokePath();
  }
}

/**
 * Draw a glowing diamond shape.
 */
export function drawGlowDiamond(gfx, cx, cy, size, color) {
  const pts = [
    { x: cx, y: cy - size },
    { x: cx + size, y: cy },
    { x: cx, y: cy + size },
    { x: cx - size, y: cy },
  ];
  drawGlowPolygon(gfx, pts, color);
}

/**
 * Draw a glowing circle.
 * @param {number} [segments=16] - Number of line segments to approximate the circle
 */
export function drawGlowCircle(gfx, cx, cy, radius, color, segments = 16, mask = false) {
  const points = [];
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  }
  drawGlowPolygon(gfx, points, color, mask);
}

/**
 * Draw a glowing ellipse with optional rotation.
 */
export function drawGlowEllipse(gfx, cx, cy, rx, ry, color, rotation = 0, segments = 16, mask = false) {
  const points = [];
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const lx = rx * Math.cos(angle);
    const ly = ry * Math.sin(angle);
    points.push({
      x: cx + lx * cosR - ly * sinR,
      y: cy + lx * sinR + ly * cosR,
    });
  }
  drawGlowPolygon(gfx, points, color, mask);
}

/**
 * Draw a glowing arc (partial ellipse).
 */
export function drawGlowArc(gfx, cx, cy, rx, ry, color, rotation = 0, startAngle = 0, endAngle = Math.PI * 2, segments = 16) {
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);
  const range = endAngle - startAngle;
  const numPts = Math.max(2, Math.round(segments * Math.abs(range) / (Math.PI * 2)));

  const points = [];
  for (let i = 0; i <= numPts; i++) {
    const angle = startAngle + (i / numPts) * range;
    const lx = rx * Math.cos(angle);
    const ly = ry * Math.sin(angle);
    points.push({
      x: cx + lx * cosR - ly * sinR,
      y: cy + lx * sinR + ly * cosR,
    });
  }

  for (const pass of GLOW_PASSES) {
    gfx.lineStyle(pass.width, color, pass.alpha);
    gfx.beginPath();
    gfx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      gfx.lineTo(points[i].x, points[i].y);
    }
    gfx.strokePath();
  }
}

/**
 * Draw a glowing dashed ellipse.
 */
export function drawGlowDashedEllipse(gfx, cx, cy, rx, ry, color, rotation = 0, numDashes = 6, segments = 16) {
  const dashArc = Math.PI * 2 / numDashes * 0.5;
  for (let i = 0; i < numDashes; i++) {
    const startAngle = (i / numDashes) * Math.PI * 2;
    drawGlowArc(gfx, cx, cy, rx, ry, color, rotation, startAngle, startAngle + dashArc, segments);
  }
}

/**
 * Draw a glowing dashed line.
 */
export function drawGlowDashedLine(gfx, x1, y1, x2, y2, color, numDashes = 4) {
  for (let i = 0; i < numDashes; i++) {
    const t0 = i / numDashes;
    const t1 = (i + 0.5) / numDashes;
    drawGlowLine(gfx,
      x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0,
      x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1, color);
  }
}

// ── Mask helpers — draw opaque fills to block what's behind ──

export function fillMaskRect(gfx, x1, y1, x2, y2, width) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len;
  const ny = dx / len;
  const hw = width / 2;

  gfx.fillStyle(0x000000, 1.0);
  gfx.beginPath();
  gfx.moveTo(x1 + nx * hw, y1 + ny * hw);
  gfx.lineTo(x2 + nx * hw, y2 + ny * hw);
  gfx.lineTo(x2 - nx * hw, y2 - ny * hw);
  gfx.lineTo(x1 - nx * hw, y1 - ny * hw);
  gfx.closePath();
  gfx.fillPath();
}

export function fillMaskCircle(gfx, cx, cy, radius) {
  const segments = 32;
  gfx.fillStyle(0x000000, 1.0);
  gfx.beginPath();
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i === 0) gfx.moveTo(x, y);
    else gfx.lineTo(x, y);
  }
  gfx.closePath();
  gfx.fillPath();
}

export function fillMaskEllipse(gfx, cx, cy, rx, ry, rotation = 0) {
  const segments = 32;
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);

  gfx.fillStyle(0x000000, 1.0);
  gfx.beginPath();
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const lx = rx * Math.cos(angle);
    const ly = ry * Math.sin(angle);
    const x = cx + lx * cosR - ly * sinR;
    const y = cy + lx * sinR + ly * cosR;
    if (i === 0) gfx.moveTo(x, y);
    else gfx.lineTo(x, y);
  }
  gfx.closePath();
  gfx.fillPath();
}

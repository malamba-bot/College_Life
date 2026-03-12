/**
 * RetroZone — Retro CRT & Vector display engine for HTML5 games.
 *
 * Core (zero dependencies):
 *   RetroDisplay     — High-level display overlay API
 *   createShaderOverlay — Low-level WebGL shader overlay
 *   createProjection — 3D→2D perspective projection
 *   vectorText       — Vector stroke font rendering
 *   vectorTextWidth  — Measure vector text width
 *
 * Phaser integration (requires Phaser 3.x):
 *   GlowRenderer     — Multi-pass glow line/polygon drawing
 *   ExplosionRenderer — Radial line-burst explosions
 *
 * Demo models:
 *   MODELS, FIGHTER, MOTH, HORNET, CROWN, SPINNER, etc.
 */

// High-level API
export { RetroDisplay } from './RetroDisplay.js';

// Low-level shader overlay
export { createShaderOverlay } from './ShaderOverlay.js';

// Projection
export { createProjection } from './Projection.js';

// Vector font
export { vectorText, vectorTextWidth } from './VectorFont.js';

// Glow rendering (Phaser)
export {
  drawGlowLine,
  drawGlowPolygon,
  drawGlowDiamond,
  drawGlowCircle,
  drawGlowEllipse,
  drawGlowArc,
  drawGlowDashedEllipse,
  drawGlowDashedLine,
  fillMaskRect,
  fillMaskCircle,
  fillMaskEllipse,
} from './GlowRenderer.js';

// Explosions
export { ExplosionRenderer } from './ExplosionRenderer.js';

// Demo models
export {
  MODELS,
  FIGHTER,
  MOTH,
  HORNET,
  CROWN,
  SPINNER,
  BEETLE,
  CRYSTAL,
  JELLYFISH,
  SPIDER,
  WARSHIP,
  BULLET,
  DART,
} from './Models.js';

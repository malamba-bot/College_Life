/**
 * RetroDisplay — high-level API for the RetroZone display engine.
 *
 * Wraps the shader overlay system with a clean, ergonomic interface.
 * Supports optional localStorage persistence for the selected display mode.
 *
 * @example
 *   import { RetroDisplay } from 'retrozone';
 *
 *   const display = new RetroDisplay(myGameCanvas);
 *   display.setMode('crt');
 *   // later...
 *   display.destroy();
 */
import { createShaderOverlay } from './ShaderOverlay.js';

export class RetroDisplay {
  /**
   * Create a retro display overlay on the given canvas.
   *
   * @param {HTMLCanvasElement} canvas - The game/source canvas to apply effects to
   * @param {Object} [options]
   * @param {'vector'|'crt'} [options.mode='vector'] - Initial display mode
   * @param {number} [options.phosphorDecay=0.78] - Phosphor persistence (0-1, vector mode)
   * @param {boolean} [options.persist=false] - Save/restore mode from localStorage
   * @param {string} [options.storageKey='retrozone-display-mode'] - localStorage key
   */
  constructor(canvas, options = {}) {
    const persist = options.persist ?? false;
    const storageKey = options.storageKey ?? 'retrozone-display-mode';

    // Restore saved mode if persistence is enabled
    let mode = options.mode ?? 'vector';
    if (persist) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved === 'crt' || saved === 'vector') mode = saved;
      } catch (e) { /* localStorage unavailable */ }
    }

    this._persist = persist;
    this._storageKey = storageKey;
    this._overlay = createShaderOverlay(canvas, {
      mode,
      phosphorDecay: options.phosphorDecay,
    });
  }

  /**
   * Switch the display mode.
   * @param {'vector'|'crt'} mode
   */
  setMode(mode) {
    if (!this._overlay) return;
    this._overlay.setShader(mode);
    if (this._persist) {
      try { localStorage.setItem(this._storageKey, mode); } catch (e) {}
    }
  }

  /**
   * Get the current display mode.
   * @returns {'vector'|'crt'}
   */
  getMode() {
    return this._overlay ? this._overlay.getShaderName() : 'vector';
  }

  /**
   * Set phosphor persistence decay (vector mode only).
   * Higher values = longer trails. 0 = no trails, 0.78 = default, 0.95 = long trails.
   * @param {number} value - 0 to 1
   */
  setPhosphorDecay(value) {
    if (this._overlay) this._overlay.setPhosphorDecay(value);
  }

  /**
   * Get the overlay canvas element (useful for custom positioning).
   * @returns {HTMLCanvasElement}
   */
  get overlayCanvas() {
    return this._overlay?.overlay ?? null;
  }

  /**
   * Stop rendering and clean up all resources.
   */
  destroy() {
    if (this._overlay) {
      this._overlay.destroy();
      this._overlay = null;
    }
  }
}

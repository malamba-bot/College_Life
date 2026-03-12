/**
 * 3D -> 2D perspective projection for wireframe rendering.
 *
 * World space:
 *   X = left/right (screen-aligned)
 *   Y = up/down (screen-aligned)
 *   Z = depth into screen (positive = farther, negative = closer)
 *
 * Objects at Z>0 appear smaller (farther). Objects at Z<0 appear larger (closer).
 * Perspective is applied relative to the vanishing point (centerX, centerY).
 */

/**
 * Create a projection system with the given configuration.
 * @param {Object} config
 * @param {number} config.centerX - Screen vanishing point X (typically canvas width / 2)
 * @param {number} config.centerY - Screen vanishing point Y (typically canvas height / 2)
 * @param {number} [config.perspective=0.006] - Perspective strength (higher = more dramatic)
 * @returns {Object} Projection functions bound to this configuration
 */
export function createProjection({ centerX, centerY, perspective = 0.006 }) {
  const CX = centerX;
  const CY = centerY;
  const PERSP = perspective;

  /**
   * Project a single 3D point to screen space.
   * @returns {{ x: number, y: number, scale: number }}
   */
  function projectPoint(worldX, worldY, worldZ) {
    const scale = 1.0 / (1.0 + worldZ * PERSP);
    return {
      x: CX + (worldX - CX) * scale,
      y: CY + (worldY - CY) * scale,
      scale,
    };
  }

  /**
   * Get the scale factor for a given depth.
   */
  function getScale(worldZ) {
    return 1.0 / (1.0 + worldZ * PERSP);
  }

  /**
   * Project a 3D wireframe model to screen space with full perspective.
   * Model lines are in local coordinates; worldX/Y/Z is the model center.
   *
   * @param {Array<{from: number[], to: number[]}>} lines - Model line segments
   * @param {number} worldX - Model center X in world space
   * @param {number} worldY - Model center Y in world space
   * @param {number} worldZ - Model center Z (depth)
   * @param {number} modelScale - Base size multiplier
   * @param {number} [rotation=0] - Y-axis rotation in radians
   * @returns {Array<{x1: number, y1: number, x2: number, y2: number, depth: number, scale: number}>}
   */
  function projectModel(lines, worldX, worldY, worldZ, modelScale, rotation = 0) {
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const result = [];

    for (const line of lines) {
      let ax = line.from[0], ay = line.from[1], az = line.from[2] || 0;
      let bx = line.to[0], by = line.to[1], bz = line.to[2] || 0;

      if (rotation !== 0) {
        const rax = ax * cosR - az * sinR;
        const raz = ax * sinR + az * cosR;
        ax = rax; az = raz;
        const rbx = bx * cosR - bz * sinR;
        const rbz = bx * sinR + bz * cosR;
        bx = rbx; bz = rbz;
      }

      const wax = worldX + ax * modelScale;
      const way = worldY + ay * modelScale;
      const waz = worldZ + az * modelScale;
      const wbx = worldX + bx * modelScale;
      const wby = worldY + by * modelScale;
      const wbz = worldZ + bz * modelScale;

      const pa = projectPoint(wax, way, waz);
      const pb = projectPoint(wbx, wby, wbz);
      const depth = (waz + wbz) * 0.5;

      result.push({
        x1: pa.x, y1: pa.y,
        x2: pb.x, y2: pb.y,
        depth,
        scale: (pa.scale + pb.scale) * 0.5,
      });
    }

    return result;
  }

  /**
   * Flat 2D sprite-like projection (no per-vertex perspective).
   * Useful for CRT mode where crisp, uniform scaling is preferred.
   *
   * @param {Array<{from: number[], to: number[]}>} lines - Model line segments
   * @param {number} screenX - Pre-projected center X on screen
   * @param {number} screenY - Pre-projected center Y on screen
   * @param {number} modelScale - Uniform scale factor
   * @param {number} [rotation=0] - 2D rotation in radians
   * @returns {Array<{x1: number, y1: number, x2: number, y2: number}>}
   */
  function projectModelFlat(lines, screenX, screenY, modelScale, rotation = 0) {
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const result = [];

    for (const line of lines) {
      let ax = line.from[0], ay = line.from[1];
      let bx = line.to[0], by = line.to[1];

      if (rotation !== 0) {
        const rax = ax * cosR - ay * sinR;
        const ray = ax * sinR + ay * cosR;
        ax = rax; ay = ray;
        const rbx = bx * cosR - by * sinR;
        const rby = bx * sinR + by * cosR;
        bx = rbx; by = rby;
      }

      result.push({
        x1: screenX + ax * modelScale,
        y1: screenY + ay * modelScale,
        x2: screenX + bx * modelScale,
        y2: screenY + by * modelScale,
      });
    }

    return result;
  }

  return { projectPoint, getScale, projectModel, projectModelFlat };
}

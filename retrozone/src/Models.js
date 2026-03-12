/**
 * 3D wireframe model definitions for demo and reference.
 * Each model is an array of line segments: { from: [x,y,z], to: [x,y,z] }
 * Coordinates are in local space, centered on (0,0,0).
 * Scale is applied during projection.
 *
 * These models are provided as examples. You can define your own models
 * using the same format: arrays of { from: [x,y,z], to: [x,y,z] } objects.
 */

// Fighter ship with center fin, inner chevron, and stepped wings
export const FIGHTER = [
  { from: [0, -13, -1.5], to: [-2.5, -7, 0] },
  { from: [0, -13, -1.5], to: [2.5, -7, 0] },
  { from: [-2.5, -7, 0], to: [-5, -1, 0.5] },
  { from: [2.5, -7, 0], to: [5, -1, 0.5] },
  { from: [-2.5, -7, 0], to: [0, -3, -0.5] },
  { from: [2.5, -7, 0], to: [0, -3, -0.5] },
  { from: [0, -3, -0.5], to: [-4, 2, 0] },
  { from: [0, -3, -0.5], to: [4, 2, 0] },
  { from: [-5, -1, 0.5], to: [-4, 2, 0] },
  { from: [5, -1, 0.5], to: [4, 2, 0] },
  { from: [-5, -1, 0.5], to: [-12, 3, 1.5] },
  { from: [5, -1, 0.5], to: [12, 3, 1.5] },
  { from: [-12, 3, 1.5], to: [-9, 5, 1] },
  { from: [12, 3, 1.5], to: [9, 5, 1] },
  { from: [-9, 5, 1], to: [-5, 7, 0.5] },
  { from: [9, 5, 1], to: [5, 7, 0.5] },
  { from: [-4, 2, 0], to: [-5, 7, 0.5] },
  { from: [4, 2, 0], to: [5, 7, 0.5] },
  { from: [-5, 7, 0.5], to: [-3, 8, 0] },
  { from: [5, 7, 0.5], to: [3, 8, 0] },
  { from: [-3, 8, 0], to: [3, 8, 0] },
];

// Moth/butterfly with curved antennae and layered wings
export const MOTH = [
  { from: [0, -6, 0], to: [-3, -9, -0.5] },
  { from: [-3, -9, -0.5], to: [-5, -8, -0.5] },
  { from: [0, -6, 0], to: [3, -9, -0.5] },
  { from: [3, -9, -0.5], to: [5, -8, -0.5] },
  { from: [0, -6, 0], to: [0, 6, 0] },
  { from: [0, -3, 0], to: [-8, -6, 1] },
  { from: [-8, -6, 1], to: [-9, 0, 1.5] },
  { from: [-9, 0, 1.5], to: [0, 0, 0] },
  { from: [0, -3, 0], to: [8, -6, 1] },
  { from: [8, -6, 1], to: [9, 0, 1.5] },
  { from: [9, 0, 1.5], to: [0, 0, 0] },
  { from: [-5, -3, 0.8], to: [-6, -1, 0.8] },
  { from: [-6, -1, 0.8], to: [-4, -1, 0.8] },
  { from: [5, -3, 0.8], to: [6, -1, 0.8] },
  { from: [6, -1, 0.8], to: [4, -1, 0.8] },
  { from: [0, 2, 0], to: [-6, 5, 1] },
  { from: [-6, 5, 1], to: [0, 5, 0] },
  { from: [0, 2, 0], to: [6, 5, 1] },
  { from: [6, 5, 1], to: [0, 5, 0] },
];

// Wasp/hornet with segmented body and angular wings
export const HORNET = [
  { from: [0, -8, -0.5], to: [-3, -5, 0] },
  { from: [0, -8, -0.5], to: [3, -5, 0] },
  { from: [-3, -5, 0], to: [-5, -7, 0.5] },
  { from: [3, -5, 0], to: [5, -7, 0.5] },
  { from: [-3, -5, 0], to: [3, -5, 0] },
  { from: [-3, -5, 0], to: [-3, -1, 0] },
  { from: [3, -5, 0], to: [3, -1, 0] },
  { from: [-3, -1, 0], to: [-1, 1, 0] },
  { from: [3, -1, 0], to: [1, 1, 0] },
  { from: [-1, 1, 0], to: [-3, 5, 0] },
  { from: [1, 1, 0], to: [3, 5, 0] },
  { from: [-3, 5, 0], to: [0, 8, 0.5] },
  { from: [3, 5, 0], to: [0, 8, 0.5] },
  { from: [-3, -3, 0], to: [-10, -6, 1.5] },
  { from: [-10, -6, 1.5], to: [-8, 0, 1] },
  { from: [-8, 0, 1], to: [-3, -1, 0] },
  { from: [3, -3, 0], to: [10, -6, 1.5] },
  { from: [10, -6, 1.5], to: [8, 0, 1] },
  { from: [8, 0, 1], to: [3, -1, 0] },
];

// Crown squid with triple spikes and trailing tentacles
export const CROWN = [
  { from: [-6, -10, -1], to: [0, -13, -1.5] },
  { from: [0, -13, -1.5], to: [6, -10, -1] },
  { from: [-6, -10, -1], to: [-3, -7, 0] },
  { from: [6, -10, -1], to: [3, -7, 0] },
  { from: [0, -13, -1.5], to: [0, -7, -0.5] },
  { from: [-3, -7, 0], to: [3, -7, 0] },
  { from: [-3, -7, 0], to: [-5, -3, 0] },
  { from: [3, -7, 0], to: [5, -3, 0] },
  { from: [-5, -3, 0], to: [-4, 2, 0] },
  { from: [5, -3, 0], to: [4, 2, 0] },
  { from: [-5, -3, 0], to: [-12, -5, 2] },
  { from: [-12, -5, 2], to: [-12, 1, 1.5] },
  { from: [-12, 1, 1.5], to: [-4, 2, 0] },
  { from: [5, -3, 0], to: [12, -5, 2] },
  { from: [12, -5, 2], to: [12, 1, 1.5] },
  { from: [12, 1, 1.5], to: [4, 2, 0] },
  { from: [-4, 2, 0], to: [-3, 7, 0.5] },
  { from: [4, 2, 0], to: [3, 7, 0.5] },
  { from: [0, -7, -0.5], to: [0, 5, 0] },
  { from: [-2, 2, 0], to: [-1, 6, 0.5] },
  { from: [2, 2, 0], to: [1, 6, 0.5] },
];

// 6-spoke gear wheel with Z-alternation for 3D spin
export const SPINNER = [
  { from: [0, -2.5, 0], to: [2.2, -1.25, 0] },
  { from: [2.2, -1.25, 0], to: [2.2, 1.25, 0] },
  { from: [2.2, 1.25, 0], to: [0, 2.5, 0] },
  { from: [0, 2.5, 0], to: [-2.2, 1.25, 0] },
  { from: [-2.2, 1.25, 0], to: [-2.2, -1.25, 0] },
  { from: [-2.2, -1.25, 0], to: [0, -2.5, 0] },
  { from: [0, -2.5, 0], to: [0, -8, 1] },
  { from: [2.2, -1.25, 0], to: [7, -4, -1] },
  { from: [2.2, 1.25, 0], to: [7, 4, 1] },
  { from: [0, 2.5, 0], to: [0, 8, -1] },
  { from: [-2.2, 1.25, 0], to: [-7, 4, 1] },
  { from: [-2.2, -1.25, 0], to: [-7, -4, -1] },
  { from: [0, -8, 1], to: [7, -4, -1] },
  { from: [7, -4, -1], to: [7, 4, 1] },
  { from: [7, 4, 1], to: [0, 8, -1] },
  { from: [0, 8, -1], to: [-7, 4, 1] },
  { from: [-7, 4, 1], to: [-7, -4, -1] },
  { from: [-7, -4, -1], to: [0, -8, 1] },
];

// Heavy beetle with rounded shell and armor plates
export const BEETLE = [
  { from: [0, -8, -1], to: [5, -6, 0] },
  { from: [5, -6, 0], to: [7, -1, 0.5] },
  { from: [7, -1, 0.5], to: [6, 4, 0] },
  { from: [6, 4, 0], to: [0, 7, 0] },
  { from: [0, 7, 0], to: [-6, 4, 0] },
  { from: [-6, 4, 0], to: [-7, -1, 0.5] },
  { from: [-7, -1, 0.5], to: [-5, -6, 0] },
  { from: [-5, -6, 0], to: [0, -8, -1] },
  { from: [0, -8, -1], to: [0, 7, 0] },
  { from: [-5, -6, 0], to: [-3, -10, -1] },
  { from: [5, -6, 0], to: [3, -10, -1] },
  { from: [-3, -10, -1], to: [3, -10, -1] },
  { from: [-7, -1, 0.5], to: [-10, 0, 1.5] },
  { from: [-10, 0, 1.5], to: [-10, 3, 1.5] },
  { from: [-10, 3, 1.5], to: [-6, 4, 0] },
  { from: [7, -1, 0.5], to: [10, 0, 1.5] },
  { from: [10, 0, 1.5], to: [10, 3, 1.5] },
  { from: [10, 3, 1.5], to: [6, 4, 0] },
];

// Diamond crystal with nested diamonds and cross-braces
export const CRYSTAL = [
  { from: [0, -11, -1], to: [9, 0, 0.5] },
  { from: [9, 0, 0.5], to: [0, 11, -1] },
  { from: [0, 11, -1], to: [-9, 0, 0.5] },
  { from: [-9, 0, 0.5], to: [0, -11, -1] },
  { from: [0, -6, 0], to: [5, 0, 0] },
  { from: [5, 0, 0], to: [0, 6, 0] },
  { from: [0, 6, 0], to: [-5, 0, 0] },
  { from: [-5, 0, 0], to: [0, -6, 0] },
  { from: [0, -6, 0], to: [0, -11, -1] },
  { from: [5, 0, 0], to: [9, 0, 0.5] },
  { from: [0, 6, 0], to: [0, 11, -1] },
  { from: [-5, 0, 0], to: [-9, 0, 0.5] },
  { from: [-5, 0, 0], to: [5, 0, 0] },
  { from: [0, -6, 0], to: [0, 6, 0] },
];

// Jellyfish ghost with wide hood and flowing tendrils
export const JELLYFISH = [
  { from: [0, -9, -1], to: [-4, -6, 0] },
  { from: [0, -9, -1], to: [4, -6, 0] },
  { from: [-4, -6, 0], to: [-7, -2, 0.5] },
  { from: [4, -6, 0], to: [7, -2, 0.5] },
  { from: [-7, -2, 0.5], to: [7, -2, 0.5] },
  { from: [-3, -5, -0.5], to: [-1, -4, -0.5] },
  { from: [1, -5, -0.5], to: [3, -4, -0.5] },
  { from: [-7, -2, 0.5], to: [-6, 3, 0.5] },
  { from: [7, -2, 0.5], to: [6, 3, 0.5] },
  { from: [-6, 3, 0.5], to: [-4, 8, 1] },
  { from: [-4, 8, 1], to: [-2, 4, 0.5] },
  { from: [-2, 4, 0.5], to: [0, 9, 1] },
  { from: [0, 9, 1], to: [2, 4, 0.5] },
  { from: [2, 4, 0.5], to: [4, 8, 1] },
  { from: [4, 8, 1], to: [6, 3, 0.5] },
  { from: [0, -2, 0], to: [0, 10, 1] },
];

// Small spider with angular legs and antennae
export const SPIDER = [
  { from: [0, -6, 0], to: [-2, -3, 0.3] },
  { from: [0, -6, 0], to: [2, -3, 0.3] },
  { from: [0, -6, 0], to: [-3, -8, -0.5] },
  { from: [0, -6, 0], to: [3, -8, -0.5] },
  { from: [-2, -3, 0.3], to: [-3, 1, 0.3] },
  { from: [2, -3, 0.3], to: [3, 1, 0.3] },
  { from: [-3, 1, 0.3], to: [0, 4, 0] },
  { from: [3, 1, 0.3], to: [0, 4, 0] },
  { from: [-2, -1, 0.3], to: [-6, -4, 1] },
  { from: [-3, 1, 0.3], to: [-6, 3, 1] },
  { from: [2, -1, 0.3], to: [6, -4, 1] },
  { from: [3, 1, 0.3], to: [6, 3, 1] },
];

// Grand warship with double crown and massive wings
export const WARSHIP = [
  { from: [-8, -14, -1.5], to: [-4, -11, -1] },
  { from: [-4, -11, -1], to: [0, -16, -2] },
  { from: [0, -16, -2], to: [4, -11, -1] },
  { from: [4, -11, -1], to: [8, -14, -1.5] },
  { from: [-5, -12, -1], to: [0, -14, -1.5] },
  { from: [0, -14, -1.5], to: [5, -12, -1] },
  { from: [-8, -14, -1.5], to: [-6, -8, 0] },
  { from: [8, -14, -1.5], to: [6, -8, 0] },
  { from: [-6, -8, 0], to: [6, -8, 0] },
  { from: [-6, -8, 0], to: [-7, -1, 0] },
  { from: [6, -8, 0], to: [7, -1, 0] },
  { from: [-7, -5, 0], to: [-15, -7, 2.5] },
  { from: [-15, -7, 2.5], to: [-15, 1, 2] },
  { from: [-15, 1, 2], to: [-7, -1, 0] },
  { from: [7, -5, 0], to: [15, -7, 2.5] },
  { from: [15, -7, 2.5], to: [15, 1, 2] },
  { from: [15, 1, 2], to: [7, -1, 0] },
  { from: [-7, -5, 0], to: [-14, -1, 2] },
  { from: [7, -5, 0], to: [14, -1, 2] },
  { from: [-7, -1, 0], to: [-5, 6, 0.5] },
  { from: [7, -1, 0], to: [5, 6, 0.5] },
  { from: [-5, 6, 0.5], to: [0, 9, 1] },
  { from: [5, 6, 0.5], to: [0, 9, 1] },
  { from: [0, -16, -2], to: [0, -8, -2] },
  { from: [0, -8, -2], to: [0, 2, -1.5] },
];

// Simple bullet (line segment)
export const BULLET = [
  { from: [0, -4, 0], to: [0, 4, 0] },
];

// Diamond dart projectile
export const DART = [
  { from: [0, -3, 0], to: [1.5, 0, 0] },
  { from: [1.5, 0, 0], to: [0, 3, 0] },
  { from: [0, 3, 0], to: [-1.5, 0, 0] },
  { from: [-1.5, 0, 0], to: [0, -3, 0] },
];

/** All demo models indexed by name */
export const MODELS = {
  fighter: FIGHTER,
  moth: MOTH,
  hornet: HORNET,
  crown: CROWN,
  spinner: SPINNER,
  beetle: BEETLE,
  crystal: CRYSTAL,
  jellyfish: JELLYFISH,
  spider: SPIDER,
  warship: WARSHIP,
  bullet: BULLET,
  dart: DART,
};

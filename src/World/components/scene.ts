import { Color, Scene } from 'three';

/**
 * Creates and returns a Three.js Scene object
 *
 * @date 5/26/2023 - 11:24:38 AM
 * @author Ryan Milligan
 *
 * @export
 * @returns {Scene} the Three.js Scene object
 */
export default function createScene() {
  const scene = new Scene();
  scene.background = new Color(0x2d3047); // color: 'Space Cadet'

  return scene;
}

import { PerspectiveCamera } from 'three';

/**
 * Creates and returns a Three.js PerspectiveCamera object
 *
 * @date 5/26/2023 - 11:34:12 AM
 * @author Ryan Milligan
 *
 * @export
 * @returns {PerspectiveCamera}
 */
export default function createCamera() {
  const camera = new PerspectiveCamera(
    75, // FOV
    2, // Aspect Ratio
    0.1, // Near
    10000 // Far
  );
  camera.position.set(0, 0, 10);

  return camera;
}

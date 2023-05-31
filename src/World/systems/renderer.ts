import { WebGLRenderer } from 'three';

/**
 * Creates and returns a Three.js WebGLRenderer object
 *
 * @date 5/26/2023 - 11:34:01 AM
 * @author Ryan Milligan
 *
 * @export
 * @returns {WebGLRenderer}
 */
export default function createRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
  });
  renderer.domElement.id = 'canvas';

  return renderer;
}

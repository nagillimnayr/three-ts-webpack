import { WebGLRenderer } from 'three';

export default function resizeCanvas(renderer: WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientWidth * 0.5;
  canvas.width = width;
  canvas.height = height;
  renderer.setSize(width, height, false);
}

import { Vector2, WebGLRenderer } from 'three';

export function resizeCanvas(renderer: WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientWidth * 0.5;
  canvas.width = width;
  canvas.height = height;
  renderer.setSize(width, height, false);
}

export function getNormalizedMousePos(
  event: MouseEvent,
  canvas: HTMLCanvasElement
) {
  // Get bounding rect of the canvas
  const rect: DOMRect = canvas.getBoundingClientRect();

  // Get mouse position relative to canvas
  // const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
  // const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

  // Normalize position
  // const x = 2 * (mouseX / canvas.width) - 1;
  // const y = -2 * (mouseY / canvas.height) + 1;

  // Normalize position
  const x = 2 * ((event.clientX - rect.left) / rect.width) - 1;
  const y = -2 * ((event.clientY - rect.top) / rect.height) + 1;

  return new Vector2(x, y);
}

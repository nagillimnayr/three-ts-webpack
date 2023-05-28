import { BoxGeometry, Color, Mesh, MeshBasicMaterial } from 'three';

export default function createCube(color: Color) {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    color,
  });
  const cube = new Mesh(geometry, material);

  return cube;
}

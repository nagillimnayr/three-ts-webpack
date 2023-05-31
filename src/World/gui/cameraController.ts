import GUI from 'lil-gui';
import { Camera } from 'three';

export default function createCameraController(cameras: Camera[]): GUI {
  const cameraController = new GUI();
  cameraController.title('Camera Controller');

  cameraController.add();

  return cameraController;
}

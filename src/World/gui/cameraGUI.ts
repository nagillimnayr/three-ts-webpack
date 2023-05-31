import GUI from 'lil-gui';
import { Camera } from 'three';
import { CameraManager } from '../components/CameraManager';

export default function createCameraController(
  cameraManager: CameraManager
): GUI {
  const cameraController = new GUI();
  cameraController.title('Camera Controller');

  const activeCamFolder = cameraController.addFolder('Active Camera');
  const cameraOptions = [cameraManager.mainCamera, cameraManager.topCamera];
  activeCamFolder.add(cameraManager, 'activeCamera', cameraOptions);

  return cameraController;
}

import GUI from 'lil-gui';
import { Camera } from 'three';
import { CameraManager } from '../components/CameraManager';

export default function createCameraGUI(cameraManager: CameraManager): GUI {
  const cameraGUI = new GUI();
  cameraGUI.title('Camera Controller');

  const activeCamFolder = cameraGUI.addFolder('Active Camera');
  const cameraOptions = [cameraManager.mainCamera, cameraManager.topCamera];
  activeCamFolder.add(cameraManager, 'activeCamera', cameraOptions);

  return cameraGUI;
}

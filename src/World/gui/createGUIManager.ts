import { CameraManager } from '../components/CameraManager';
import { GUIManager } from './GUIManager';
import createCameraGUI from './cameraGUI';

export default function createGUIManager(
  cameraManager: CameraManager
): GUIManager {
  const guiManager = new GUIManager({
    camGUI: createCameraGUI(cameraManager),
  });

  return guiManager;
}

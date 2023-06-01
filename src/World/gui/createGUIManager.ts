import { CameraManager } from '../components/CameraManager';
import { TimeManager } from '../systems/TimeManager';
import { GUIManager } from './GUIManager';
import createCameraGUI from './cameraGUI';
import createTimeGUI from './timeGUI';

export default function createGUIManager(
  cameraManager: CameraManager,
  timeManager: TimeManager
): GUIManager {
  const guiManager = new GUIManager({
    camGUI: createCameraGUI(cameraManager),
    timeGUI: createTimeGUI(timeManager),
  });

  return guiManager;
}

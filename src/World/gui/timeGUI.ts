import GUI from 'lil-gui';
import { TimeManager } from '../systems/TimeManager';

export default function createTimeGUI(timeManager: TimeManager) {
  const timeGUI = new GUI();
  const timeScaleFolder = timeGUI.addFolder('Time Scale');
  timeScaleFolder.add(timeManager, 'timeScale', 1, 20, 1);

  const elapsedTimeFolder = timeGUI.addFolder('Elapsed Time');
  elapsedTimeFolder.add(timeManager, 'timeElapsed');
  elapsedTimeFolder.controllers[0].disable();

  return timeGUI;
}

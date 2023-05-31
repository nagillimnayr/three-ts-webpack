import GUI from 'lil-gui';

export class GUIManager {
  cameraController?: GUI;
  timeController?: GUI;
  bodyController?: GUI;

  constructor(options?: { camGUI?: GUI; timeGUI?: GUI; bodyGUI?: GUI }) {
    this.cameraController = options?.camGUI ?? null;
    this.timeController = options?.timeGUI ?? null;
    this.bodyController = options?.bodyGUI ?? null;
  }
}

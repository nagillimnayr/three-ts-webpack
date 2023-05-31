import GUI from 'lil-gui';

export class GUIManager {
  cameraGUI?: GUI;
  timeGUI?: GUI;
  bodyGUI?: GUI;

  constructor(options?: { camGUI?: GUI; timeGUI?: GUI; bodyGUI?: GUI }) {
    this.cameraGUI = options?.camGUI ?? null;
    this.timeGUI = options?.timeGUI ?? null;
    this.bodyGUI = options?.bodyGUI ?? null;
  }
}

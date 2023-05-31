import GUI from 'lil-gui';
import Body from '../components/Body';

export function createBodyGUI(body?: Body): GUI {
  const bodyGUI = new GUI();
  if (body) {
    bodyGUI.add(body, 'name');
  }

  return bodyGUI;
}

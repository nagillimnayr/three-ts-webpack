import GUI from 'lil-gui';
import Body from '../components/Body';

export function createBodyGUI(body: Body): GUI {
  const gui = new GUI();
  gui.add(body, 'name');

  return gui;
}

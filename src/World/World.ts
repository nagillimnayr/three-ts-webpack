import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import createCamera from './components/camera';
import createRenderer from './systems/renderer';
import createScene from './components/scene';
import createCube from './components/cube';
import resizeCanvas from '../utils/canvas';

export default class World {
  camera: PerspectiveCamera;

  renderer: WebGLRenderer;

  scene: Scene;

  controls: OrbitControls;

  constructor(container: HTMLElement | HTMLDivElement) {
    // Create components
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();

    // Attach canvas to container
    container.appendChild(this.renderer.domElement);

    // create cube
    const cube = createCube(new Color(0xf8333c)); // color: imperial red
    this.scene.add(cube);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.update() must be called after any manual changes to the camera's transform
    this.camera.position.set(0, 0, 10);
    this.controls.update();

    // Adjust canvas size to be in line with it's display size
    resizeCanvas(this.renderer);
  }

  render() {
    // render a frame
    this.renderer.render(this.scene, this.camera);
  }
}

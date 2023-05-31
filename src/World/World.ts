import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  AxesHelper,
  Clock,
  Color,
  MeshBasicMaterial,
  PerspectiveCamera,
  PolarGridHelper,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import createCamera from './components/camera';
import createRenderer from './systems/renderer';
import createScene from './components/scene';
import { resizeCanvas, getNormalizedMousePos } from './utils/canvas';
import createClock from './systems/clock';
import Body from './components/Body';
import { DAY, DIST_MULT, KM_TO_M } from './utils/constants';
import inOrderTraversal from './utils/treeTraversal';
import Stats from 'three/examples/jsm/libs/stats.module';
import SelectionManager from './systems/SelectionManager';

export default class World {
  camera: PerspectiveCamera;

  renderer: WebGLRenderer;

  scene: Scene;

  clock: Clock;

  controls: OrbitControls;
  stats: Stats;
  timeScale: number;
  selectionManager: SelectionManager;

  constructor(container: HTMLElement | HTMLDivElement) {
    // Create components
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();
    this.clock = createClock();
    this.stats = new Stats();
    this.timeScale = 1;
    this.selectionManager = new SelectionManager();

    // Attach canvas to container
    container.appendChild(this.renderer.domElement);

    // create cube
    // const cube = createCube(new Color(0xf8333c)); // color: imperial red
    // this.scene.add(cube);
    const sphereGeometry = new SphereGeometry(1, 32, 32);
    const sunMaterial = new MeshBasicMaterial({
      color: 0xfdee00, // color: Aureolin
    });
    const earthMaterial = new MeshBasicMaterial({
      color: 0x03c03c, // color: Dark Pastel Green
    });
    const sun = new Body(sphereGeometry, sunMaterial, {
      mass: 1, // 1 Solar Mass
    });
    sun.name = 'Sun';
    const earth = new Body(sphereGeometry, earthMaterial, {
      mass: 0,
      velocity: new Vector3(0, 0, (-30 * KM_TO_M) / DIST_MULT), // 30km/s
    });
    earth.name = 'Earth';
    earth.position.set(14.95, 0, 0);
    earth.scale.set(0.3, 0.3, 0.3);
    sun.add(earth); // attach earth to sun
    this.scene.add(sun);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.update() must be called after any manual changes to the camera's transform
    this.camera.position.set(0, 0, 10);
    this.controls.update();

    // Adjust canvas size to be in line with it's display size
    resizeCanvas(this.renderer);

    this.renderer.domElement.parentElement.appendChild(this.stats.dom);

    const polarGrid = new PolarGridHelper(20);
    const axes = new AxesHelper(20);
    this.scene.add(polarGrid);
    this.scene.add(axes);

    // Setup mouse handler
    window.addEventListener('click', (event: MouseEvent) => {
      this.handleClick(event);
    });

    window.addEventListener('resize', () => {
      resizeCanvas(this.renderer);
    });
    resizeCanvas(this.renderer);
  }

  render() {
    // get time since last update
    const deltaTime = this.clock.getDelta() * this.timeScale * DAY;

    // update all of the bodies in the simulation
    inOrderTraversal(this.scene.children[0] as Body, deltaTime);

    // render a frame
    this.renderer.render(this.scene, this.camera);

    this.stats.update();
  }

  handleClick(event: MouseEvent) {
    const canvas: HTMLCanvasElement = this.renderer.domElement;
    const pos: Vector2 = getNormalizedMousePos(event, canvas);
    this.selectionManager.select(pos, this.camera, this);
  }
}

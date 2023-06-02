import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  AxesHelper,
  Camera,
  Clock,
  MeshBasicMaterial,
  PolarGridHelper,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import createRenderer from './systems/renderer';
import createScene from './components/scene';
import { resizeCanvas, getNormalizedMousePos } from './utils/canvas';
import createClock from './systems/clock';
import Body from './components/Body';
import { DAY, DIST_MULT, KM_TO_M } from './utils/constants';
import inOrderTraversal from './utils/treeTraversal';
import Stats from 'three/examples/jsm/libs/stats.module';
import SelectionManager from './systems/SelectionManager';
import { CameraManager } from './components/CameraManager';
import { GUIManager } from './gui/GUIManager';
import createGUIManager from './gui/createGUIManager';
import { TimeManager } from './systems/TimeManager';
import { Geometry } from './namespaces/Geometry';
import loadPlanetPreset from './utils/loadPlanetPreset';
import FixedTimeStep, { makeFixedUpdateFn } from './systems/FixedTimeStep';

export default class World {
  cameraManager: CameraManager;
  renderer: WebGLRenderer;
  scene: Scene;
  controls: OrbitControls;
  stats: Stats;
  selectionManager: SelectionManager;
  guiManager: GUIManager;
  timeManager: TimeManager;
  fixedUpdate: (deltaTime: number)=>void;

  constructor(container: HTMLElement | HTMLDivElement) {
    // Create components
    this.cameraManager = new CameraManager();
    this.renderer = createRenderer();
    this.scene = createScene();
    this.stats = new Stats();
    this.selectionManager = new SelectionManager();
    this.timeManager = new TimeManager();
    this.guiManager = createGUIManager(this.cameraManager, this.timeManager);
    this.fixedUpdate = makeFixedUpdateFn(20, (timeStep: number) => {
      // update all of the bodies in the simulation
      inOrderTraversal(this.scene.children[0] as Body, timeStep);
    })

    // Attach canvas to container
    container.appendChild(this.renderer.domElement);

    //const sphereGeometry = new SphereGeometry(1, 32, 32);
    const sphereGeometry: SphereGeometry = Geometry.sphere;
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

    const earth = loadPlanetPreset('Earth');
    earth.scale.set(0.3, 0.3, 0.3);
    sun.add(earth); // attach earth to sun
    this.scene.add(sun);

    // create orbital controls for main camera
    this.controls = new OrbitControls(
      this.cameraManager.mainCamera,
      this.renderer.domElement
    );
    // controls.update() must be called after any manual changes to the camera's transform
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

    this.timeManager.unpause();
  }

  render() {
    // get time since last update
    const deltaTime = this.timeManager.deltaTime;
    if (deltaTime <= 0) {
      return;
    }

    // update all of the bodies in the simulation
    //inOrderTraversal(this.scene.children[0] as Body, deltaTime);
    this.fixedUpdate(deltaTime);

    // render a frame
    this.renderer.render(this.scene, this.cameraManager.activeCamera);

    this.stats.update();
  }

  handleClick(event: MouseEvent) {
    const canvas: HTMLCanvasElement = this.renderer.domElement;
    const pos: Vector2 = getNormalizedMousePos(event, canvas);
    this.selectionManager.select(pos, this.cameraManager.activeCamera, this);
  }
}

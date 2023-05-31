import {
  Camera,
  MathUtils,
  OrthographicCamera,
  PerspectiveCamera,
} from 'three';
import { createMainCamera, createTopCamera } from './camera';

export class CameraManager {
  private _activeCamera: Camera;
  private _mainCamera: PerspectiveCamera;
  private _topCamera: OrthographicCamera;

  constructor() {
    this._mainCamera = createMainCamera();
    this._topCamera = createTopCamera();
    this._activeCamera = this._mainCamera;

    this._mainCamera.position.set(0, 0, 10); // set back from origin

    // set top cam to be above origin
    this._topCamera.position.set(0, 10, 0);
    // rotate top cam to look down
    this._topCamera.rotateX(MathUtils.degToRad(-90));
  }

  get activeCamera() {
    return this._activeCamera;
  }
  get mainCamera() {
    return this._mainCamera;
  }
  get topCamera() {
    return this._topCamera;
  }

  set activeCamera(camera: Camera) {
    this._activeCamera = camera;
  }

  setActiveCamera(camera: Camera) {
    this._activeCamera = camera;
  }
  switchToMain() {
    this._activeCamera = this._mainCamera;
  }
  switchToTop() {
    this._activeCamera = this._topCamera;
  }
}

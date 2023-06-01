import { BufferGeometry, Material, Mesh, Vector3 } from 'three';
import PointMass from '../interfaces/PointMass';
import { RaycastLayer } from '../utils/layers';

/**
 * @description
 * @author Ryan Milligan
 * @date 26/05/2023
 * @export
 * @class Body
 * @extends {Mesh}
 */
export default class Body extends Mesh implements PointMass {
  private _velocity: Vector3;

  private _acceleration: Vector3;

  private _mass: number;

  private _isSelected: boolean;

  /**
   * Creates an instance of Body.
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {BufferGeometry} geometry
   * @param {Material} material
   * @param {{
   *       velocity?: Vector3;
   *       acceleration?: Vector3;
   *       mass?: number;
   *     }} [options]
   * @memberof Body
   */
  constructor(
    geometry: BufferGeometry,
    material: Material,
    options?: {
      velocity?: Vector3;
      acceleration?: Vector3;
      mass?: number;
    }
  ) {
    super(geometry, material);

    this._velocity = options?.velocity ?? new Vector3(0, 0, 0);
    this._acceleration = options?.acceleration ?? new Vector3(0, 0, 0);
    this._mass = options?.mass ?? 0;

    this._isSelected = false;
    this.layers.enable(RaycastLayer.bodies);
  }

  get velocity(): Vector3 {
    return this._velocity;
  }
  get acceleration(): Vector3 {
    return this._acceleration;
  }
  get mass(): number {
    return this._mass;
  }
  get isSelected(): boolean {
    return this._isSelected;
  }

  set velocity(newVelocity: Vector3) {
    this._velocity = newVelocity;
  }
  set acceleration(newAcceleration: Vector3) {
    this._acceleration = newAcceleration;
  }
  set mass(newMass: number) {
    if (newMass >= 0) {
      this._mass = newMass;
    } else {
      throw new Error('mass cannot be negative');
    }
  }

  /**
   * @description
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {number} deltaTime
   * @memberof Body
   */
  private updatePosition(deltaTime: number) {
    this.position.addScaledVector(this.velocity, deltaTime);
  }

  /**
   * @description
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {number} deltaTime
   * @memberof Body
   */
  private updateVelocity(deltaTime: number) {
    this.velocity.addScaledVector(this.acceleration, deltaTime);
  }

  update(deltaTime: number) {
    // Note: test whether swapping the order
    // of update calls makes a significant difference
    this.updatePosition(deltaTime);
    this.updateVelocity(deltaTime);
  }

  select(): Body {
    this._isSelected = true;
    return this;
  }
  unselect(): Body {
    this._isSelected = false;
    return this;
  }
}

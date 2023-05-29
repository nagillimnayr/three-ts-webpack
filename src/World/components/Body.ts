import { BufferGeometry, Material, Mesh, Vector3 } from 'three';
import PointMass from '../physics/PointMass';

/**
 * @description
 * @author Ryan Milligan
 * @date 26/05/2023
 * @export
 * @class RigidBody
 * @extends {Mesh}
 */
export default class Body extends Mesh implements PointMass {
  private _velocity: Vector3;

  private _acceleration: Vector3;

  private _mass: number;

  /**
   * Creates an instance of RigidBody.
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {BufferGeometry} geometry
   * @param {Material} material
   * @param {{
   *       velocity?: Vector3;
   *       acceleration?: Vector3;
   *       mass?: number;
   *     }} [options]
   * @memberof RigidBody
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

    this.velocity = options?.velocity ?? new Vector3(0, 0, 0);
    this.acceleration = options?.acceleration ?? new Vector3(0, 0, 0);
    this.mass = options?.mass ?? 0;
  }

  get velocity(): Vector3 {
    return this._velocity;
  }
  get acceleration(): Vector3 {
    return this._acceleration;
  }
  get mass(): number {
    return this.mass;
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
   * @memberof RigidBody
   */
  updatePosition(deltaTime: number) {
    this.position.addScaledVector(this.velocity, deltaTime);
  }

  /**
   * @description
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {number} deltaTime
   * @memberof RigidBody
   */
  updateVelocity(deltaTime: number) {
    this.velocity.addScaledVector(this.acceleration, deltaTime);
  }
}

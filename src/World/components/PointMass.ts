import { BufferGeometry, Material, Mesh, Vector3 } from 'three';

/**
 * @description
 * @author Ryan Milligan
 * @date 26/05/2023
 * @export
 * @class PointMass
 * @extends {Mesh}
 */
export default class PointMass extends Mesh {
  velocity: Vector3;

  acceleration: Vector3;

  mass: number;

  /**
   * Creates an instance of PointMass.
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {BufferGeometry} geometry
   * @param {Material} material
   * @param {{
   *       velocity?: Vector3;
   *       acceleration?: Vector3;
   *       mass?: number;
   *     }} [options]
   * @memberof PointMass
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

  /**
   * @description
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {number} deltaTime
   * @memberof PointMass
   */
  updatePosition(deltaTime: number) {
    this.position.addScaledVector(this.velocity, deltaTime);
  }

  /**
   * @description
   * @author Ryan Milligan
   * @date 26/05/2023
   * @param {number} deltaTime
   * @memberof PointMass
   */
  updateVelocity(deltaTime: number) {
    this.velocity.addScaledVector(this.acceleration, deltaTime);
  }
}

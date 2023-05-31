import { Clock } from 'three';

export class TimeManager {
  /**
   * @description Clock to track how much real time has passed.
   *
   * @author Ryan Milligan
   * @date 31/05/2023
   * @type {Clock}
   * @memberof TimeManager
   */
  private _realTimeClock: Clock;
  /**
   * @description Tracks the time that has elapsed in-simulation.
   * Accounts for timeScale and whether sim has been paused or not.
   *
   * @author Ryan Milligan
   * @date 31/05/2023
   * @type {number}
   * @memberof TimeManager
   */
  private _timeElapsed: number;
  /**
   * @description Scalar value to speed up / slow-down the simulation.
   * At a timeScale of 1, one real second is equivalent to one day in the
   * simulation.
   *
   * @author Ryan Milligan
   * @date 31/05/2023
   * @type {number}
   * @memberof TimeManager
   */
  private _timeScale: number;

  constructor() {
    this._realTimeClock = new Clock(true);
    this._timeElapsed = 0;
    this._timeScale = 1;
  }
}

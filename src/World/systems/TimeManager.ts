import { Clock } from 'three';
import { DAY } from '../utils/constants';

export class TimeManager {
  /**
   * @description Clock to track how much real time has passed.
   *
   * @author Ryan Milligan
   * @date 31/05/2023
   * @type {Clock}
   * @memberof TimeManager
   */
  private _clock: Clock;
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
   * @description Tracks the real time that the simulation has been running
   *
   * @author Ryan Milligan
   * @date 31/05/2023
   * @private
   * @type {number}
   * @memberof TimeManager
   */
  private _realTimeElapsed: number;
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
    this._clock = new Clock(true);
    this._timeElapsed = 0;
    this._realTimeElapsed = 0;
    this._timeScale = 1;
  }

  pause() {
    this._clock.stop();
  }

  unpause() {
    this._clock.start();
  }

  tick(): number {
    return this.deltaTime;
  }

  get isRunning(): boolean {
    return this._clock.running;
  }

  get realTimeElapsed(): number {
    return this._realTimeElapsed;
  }
  get timeElapsed(): number {
    return this._timeElapsed;
  }
  get deltaTime(): number {
    if (!this.isRunning) {
      return 0;
    }

    const deltaTime = this._clock.getDelta();
    this._realTimeElapsed += deltaTime;
    const scaledDeltaTime = deltaTime * this._timeScale * DAY;
    this._timeElapsed += scaledDeltaTime;

    return scaledDeltaTime;
  }

  get timeScale(): number {
    return this._timeScale;
  }
  set timeScale(newTimeScale: number) {
    if (newTimeScale > 1) {
      this._timeScale = newTimeScale;
    } else {
      this._timeScale = 1;
    }
  }
}

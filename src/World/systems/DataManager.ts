import Body from '../components/Body';
import { DataRecord } from '../data/DataRecord';
import { writeToJSON } from './fs/writeToJSON';

/**
 * @description Manages and records data collected during the running of
 * the simulation.
 *
 * @author Ryan Milligan
 * @date 31/05/2023
 * @export
 * @class DataManager
 */
export class DataManager {
  private _trackedBody: Body; // Body to track and record data from
  private _updatesPerRecord: number;
  private _updateCounter: number;
  private _data: DataRecord[];
  private _fixedStep: boolean;
  

  constructor(fixedStep: boolean) {
    this._fixedStep = fixedStep;
    this._trackedBody = null;
    this._updatesPerRecord = 2400;
    this._updateCounter = 0;
    this._data = [];
  }

  track(body: Body) {
    this._trackedBody = body;
  }

  get trackedBody(): Body {
    return this._trackedBody;
  }

  collectData(elapsedTime: number) {
    if (!this._trackedBody) {
      console.error('Tracked body is null');
      return;
    }
    if (++this._updateCounter == this._updatesPerRecord) {
      this._updateCounter = 0; // reset counter

      const dataRecord: DataRecord = {
        updateIteration: this._updatesPerRecord * (this._data.length + 1),
        elapsedTime: elapsedTime,
        position: this._trackedBody.position,
        velocity: this._trackedBody.velocity,
        acceleration: this._trackedBody.acceleration,
      }
    }
  }

  logData() {
    if (!this._trackedBody) {
      console.error('Tracked body is null');
      return;
    }
    const dataLog = {
      name: this._trackedBody.name,
      fixedStep: this._fixedStep,
      dataRecords: this._data,
    }

    let fileName = 'data-log-';
    fileName += this._fixedStep ? 'fixed-' : 'unfixed-';
    fileName += '1';
    writeToJSON(dataLog, fileName);
  }

}

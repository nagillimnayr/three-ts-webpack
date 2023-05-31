import Body from '../components/Body';

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
  _trackedBody: Body; // Body to track and record data from

  constructor() {
    this._trackedBody = null;
  }

  track(body: Body) {
    this._trackedBody = body;
  }

  get trackedBody(): Body {
    return this._trackedBody;
  }
}

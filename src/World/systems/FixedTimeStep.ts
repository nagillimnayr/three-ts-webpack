export default class FixedTimeStep {
  private _timeStep: number;
  private _stepsPerSecond: number;
  private _remainder: number;
  private _updateFn: (timeStep: number) => void; // update function

  constructor(stepsPerSecond: number, updateFn: (timeStep: number) => void) {
    this._stepsPerSecond = stepsPerSecond;
    this._timeStep = 60 / stepsPerSecond;
    this._remainder = 0;
    this._updateFn = updateFn;
  }

  public get timeStep(): number {
    return this._timeStep;
  }
  public get stepsPerSecond(): number {
    return this.stepsPerSecond;
  }

  update(deltaTime: number) {
    // determine how many updates we need to do for this frame
    const numOfStepsFloat = this._stepsPerSecond * deltaTime + this._remainder;
    // this value will likely be a floating point number, so
    // we must truncate it to an integer
    const numOfStepsInt = Math.floor(numOfStepsFloat);

    // Save the truncated part to add it on during the next update
    this._remainder = numOfStepsFloat - numOfStepsInt;

    // Call the update function the requisite number of times
    for (let i = 0; i < numOfStepsInt; i++) {
      this._updateFn(this._timeStep);
    }
  }
}

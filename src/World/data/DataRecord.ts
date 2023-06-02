
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface DataRecord {
  updateIteration: number;
  elapsedTime: number;
  position: Vec3;
  velocity: Vec3;
  acceleration: Vec3;
}


interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface DataRecord {
  fixedStep: boolean;
  name: string;
  updateIter: number;
  elapsedTime: number;
  position: Vec3;
  velocity: Vec3;
  acceleration: Vec3;
}

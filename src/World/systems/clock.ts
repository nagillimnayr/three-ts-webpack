import { Clock } from 'three';

export default function createClock(): Clock {
  const clock = new Clock(true);
  return clock;
}

import Body from '../components/Body';
import { Geometry } from '../namespaces/Geometry';
import data from '../data/Planets.json';
import { MeshBasicMaterial, Vector3 } from 'three';
import { DIST_MULT } from './constants';

type key =
  | 'Mercury'
  | 'Venus'
  | 'Earth'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune';

interface PlanetData {
  Mass_KG: number;
  MeanRadius_M: number;
  SemiMajorAxis_M: number;
  SiderealOrbitPeriod_Days: number;
  Periapsis_M: number;
  Apoapsis_M: number;
  MaxVelocity_KMs: number;
  MinVelocity_KMs: number;
  Eccentricity: number;
  Inclination_Deg: number;
  MeanLongitude_Deg: number;
  LongitudeOfPeriapsis_Deg: number;
  LongitudeOfAscendingNode_Deg: number;
  AxialTilt_Deg: number;
  SiderealRotationPeriod_Hrs: number;
  SiderealRotationPeriod_Days: number;
  Color: string;
}
interface PlanetDataJSON {
  'Mercury': PlanetData;
  'Venus': PlanetData;
  'Earth': PlanetData;
  'Mars': PlanetData;
  'Jupiter': PlanetData;
  'Saturn': PlanetData;
  'Uranus': PlanetData;
  'Neptune': PlanetData;
}
export default function loadPlanetPreset(name: key) {
  const jsonData: PlanetDataJSON = data;
  const index: keyof typeof jsonData = name;
  const planetData: PlanetData = jsonData[index];

  const planet: Body = new Body(
    Geometry.sphere,
    new MeshBasicMaterial({ color: planetData.Color }),
    {
      mass: planetData.Mass_KG,
      velocity: new Vector3(0, planetData.MaxVelocity_KMs / DIST_MULT, 0),
    }
  );

  planet.position.x = planetData.Periapsis_M / DIST_MULT;
}

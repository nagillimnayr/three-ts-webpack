import { Camera, Raycaster, Vector2 } from 'three';
import Body from '../components/Body';
import World from '../World';
import { RaycastLayer } from '../utils/layers';

export default class SelectionManager {
  raycaster: Raycaster;
  selected: Body;

  constructor() {
    this.raycaster = new Raycaster();
    this.selected = undefined;
    this.raycaster.layers.set(RaycastLayer.bodies);
  }

  select(normalizedPosition: Vector2, camera: Camera, world: World) {
    this.raycaster.setFromCamera(normalizedPosition, camera);
    const hitObjects = this.raycaster.intersectObjects(world.scene.children);
    if (hitObjects.length > 0) {
      // get the first object to be hit and try to cast to Body
      const hitObj: Body = hitObjects[0].object as Body;

      if (hitObj !== undefined) {
        console.log('Hit!:', hitObj.name);
        if(this.selected !== undefined) {
          this.selected.unselect();
        }
        this.selected = hitObj.select();
      }
    }
  }
}

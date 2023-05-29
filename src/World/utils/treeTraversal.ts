import Body from '../components/Body';
import calculateGravitation from '../physics/forces/calculateGravitation';

function inOrderTraversal(body: Body, deltaTime: number): void {
  // If root body does not exist, return
  if (!body) {
    return;
  }

  const numOfChildren = body.children.length;
  // Traverse through each child branch
  for (let i = 0; i < numOfChildren; i++) {
    // try to cast child to RigidBody
    const orbitingBody = body.children[i] as Body;
    if (!orbitingBody) {
      continue;
    }

    // Calculate new acceleration
    orbitingBody.acceleration = calculateGravitation(orbitingBody, body);
    // Calculate new velocity
    orbitingBody.updateVelocity(deltaTime);
    // Calculate new position
    orbitingBody.updatePosition(deltaTime);

    // Traverse deeper into the tree
    if (orbitingBody.children.length > 0) {
      inOrderTraversal(orbitingBody, deltaTime);
    }
  }
}

export default inOrderTraversal;

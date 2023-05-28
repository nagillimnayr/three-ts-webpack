import RigidBody from '../components/RigidBody';

function inOrderTraversal(root: RigidBody, deltaTime: number): void {
  // If root body does not exist, return
  if (!root) {
    return;
  }

  const numOfChildren = root.children.length;
  // Traverse through each child branch
  for (let i = 0; i < numOfChildren; i++) {
    // try to cast child to RigidBody
    const body = root.children[i] as RigidBody;
    if (!body) {
      continue;
    }

    // Calculate new acceleration
    body.calculateAcceleration(root);
    // Calculate new velocity
    body.updateVelocity(deltaTime);
    // Calculate new position
    body.updatePosition(deltaTime);

    // Traverse deeper into the tree
    if (body.children.length > 0) {
      inOrderTraversal(body, deltaTime);
    }
  }
}

export default inOrderTraversal;

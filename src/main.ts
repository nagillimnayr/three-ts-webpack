import './style/style.css';
import resizeCanvas from './World/utils/canvas';
import World from './World/World';

/** Todo:
 * Create Debug UI
 * make debug UI optional via query parameters
 */

const main = () => {
  // get reference to #app div element
  const app = document.createElement('div');
  app.id = 'app';
  // Create #canvasHolder div element
  const canvasHolder = document.createElement('div');
  canvasHolder.id = 'canvasHolder';
  // nest canvasHolder inside of #app div
  app?.appendChild(canvasHolder);

  document.body.appendChild(app);

  // create World
  const world = new World(canvasHolder);

  window.addEventListener('resize', () => {
    resizeCanvas(world.renderer);
  });
  resizeCanvas(world.renderer);

  // render loop
  const render = (time: number) => {
    const deltaTime = time * 0.001;
    world.render();
    // loop
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

window.addEventListener('load', main);

import './style/style.css';

const main = () => {
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);
};
window.addEventListener('load', main);

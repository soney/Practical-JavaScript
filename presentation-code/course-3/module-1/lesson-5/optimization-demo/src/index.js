import { square } from './math';

function component() {
  const element = document.createElement('div');

  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  element.appendChild(btn);

  const result = document.createElement('p');
  result.innerHTML = `5 squared is ${square(5)}`;
  element.appendChild(result);

  // Note: 'cube' is NOT imported, so it should be tree-shaken out.

  btn.onclick = async () => {
    // Dynamic import for Code Splitting / Lazy Loading
    try {
      const { default: hugeComponent } = await import(/* webpackChunkName: "huge-component" */ './huge-component');
      element.appendChild(hugeComponent());
    } catch (error) {
      console.error('Error loading component:', error);
    }
  };

  return element;
}

document.body.appendChild(component());

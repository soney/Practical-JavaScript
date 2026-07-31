import reactDom from 'react-dom/client';
import App from './App';

const rootEl = document.querySelector("#root");
const root = reactDom.createRoot(rootEl);

root.render(<App />);

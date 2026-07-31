import reactDom from 'react-dom/client';
import CountdownTimer from './CountdownTimer';

const rootEl = document.querySelector("#root");
const root = reactDom.createRoot(rootEl);

root.render(<CountdownTimer />);

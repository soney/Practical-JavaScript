import { freact, useState, useRef, useEffect } from './freact.js';
import Greeting from './Greeting.jsx'

export default function App() {
  const [ clickCount, setClickCount ] = useState(0);

  useEffect(() => {
    const onClick = () => {
      setClickCount((c) => c+1);
    }
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  });

  return <h1>
        You clicked {clickCount} time(s)
    </h1>;
}
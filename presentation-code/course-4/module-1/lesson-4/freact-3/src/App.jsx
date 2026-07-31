import { freact, useState } from './freact.js';
import Greeting from './Greeting.jsx'

export default function App() {
  const [ clickCount, setClickCount ] = useState(0);
  function callback() {
    setClickCount(clickCount+1);
  }
  return <div>
        <button onClick={callback}>You clicked {clickCount} time(s)</button>
    </div>;
}
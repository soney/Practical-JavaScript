import { freact, useState, useRef } from './freact.js';
import Greeting from './Greeting.jsx'

export default function App() {
  const inputRef = useRef(null);
  const [ clickCount, setClickCount ] = useState(0);
  function callback() {
    console.log(inputRef.current);
    // setClickCount(clickCount+1);
  }
  return <div>
        <input ref={inputRef}></input>
        <button onClick={callback}>You clicked {clickCount} time(s)</button>
    </div>;
}
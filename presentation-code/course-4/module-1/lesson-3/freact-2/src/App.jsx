import { freact } from './freact.js';
import Greeting from './Greeting.jsx'

export default function App() {
  function callback() {
    console.log("Clicked");
  }
  return <div>
        <button onClick={callback}>Click Me</button>
    </div>;
}
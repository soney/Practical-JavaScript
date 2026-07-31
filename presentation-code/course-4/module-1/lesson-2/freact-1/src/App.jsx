import { freact } from './freact.js';
import Greeting from './Greeting.jsx'

export default function App() {
  const names = ["Alice", "Bob", "Charlie"];
  return <>
        <h1 id="my_id" className="header">Hello</h1>
        <p>Hello from fake react!</p>
        { names.map((n) => {
            return <Greeting name={n} />
        })}
    </>;
}
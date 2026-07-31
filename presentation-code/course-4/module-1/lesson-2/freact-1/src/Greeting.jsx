import { freact } from './freact.js';

export default function Greeting({name}) {
    return <div>Hello, {name || "visitor"}</div>;
}
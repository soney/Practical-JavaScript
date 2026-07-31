/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(1);
    const x = 1;

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
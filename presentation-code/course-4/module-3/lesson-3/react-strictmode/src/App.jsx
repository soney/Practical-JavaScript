import { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function handleClick() {
      setCount((c) => c+1);
    }
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    }
  }, []);
  console.log("App rendered");

  return (
    <div>
      <h1>Clicked {count} time(s)</h1>
    </div>
  );
}
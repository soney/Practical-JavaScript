import { useState } from 'react';

export default function WindowListener() {
  const [count, setCount] = useState(0);

  // MISTAKE: Adds a new listener on EVERY render!
  window.addEventListener('click', () => {
    setCount(c => c + 1);
  });

  // // CORRECT: 
  // useEffect(() => {
  //   const handleClick = () => { setCount(c => c + 1); };
  //   window.addEventListener('click', handleClick);
  //   return () => window.removeEventListener('click', handleClick);
  // }, []);
    

  return (
    <button>Count: {count}</button>
  );
}
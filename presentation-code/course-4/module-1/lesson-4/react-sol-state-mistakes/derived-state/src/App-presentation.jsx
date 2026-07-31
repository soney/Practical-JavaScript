import { useState } from 'react';

export default function ItemList() {
  const [items, setItems] = useState(['Apple', 'Banana']);
  
  // MISTAKE: Storing length as a separate state variable
  const [itemCount, setItemCount] = useState(2); 

  // CORRECT: Derive length directly from items on every render
  // const itemCount = items.length;

  function addItem(newItem) {
    setItems([...items, newItem]);
    setItemCount(c => c + 1); // Now we have to manually keep them in sync!
  }

  return (
    <>
      <p>Total Items: {itemCount}</p>
      <button onClick={() => addItem("Orange")}>Add Orange</button>
      <ul>{items.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
    </>
  );
}

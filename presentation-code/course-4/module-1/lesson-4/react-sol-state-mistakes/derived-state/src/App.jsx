import React, { useState } from 'react';

function DerivedStateMistake() {
  const [items, setItems] = useState(['Apple', 'Banana']);
  
  // MISTAKE: Storing a value in state that can be easily calculated from existing state.
  // This causes redundant state updates, potential bugs if things get out of sync, 
  // and makes the component harder to maintain.
  const [itemCount, setItemCount] = useState(2); 

  // CORRECT WAY: Calculate the derived value on the fly during render.
  // const derivedItemCount = items.length;

  function addItem(newItem) {
    setItems([...items, newItem]);
    
    // MISTAKE: Because we used state for the count, we have to remember to 
    // manually keep it in sync every time the items array changes!
    setItemCount(prevCount => prevCount + 1); 
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Mistake: Storing Derived State</h2>
      
      <p>Items Count (stored in separate state): <strong>{itemCount}</strong></p>
      {/* <p>Items Count (derived automatically): <strong>{items.length}</strong></p> */}

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => addItem('Orange')}>
          Add Item
        </button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DerivedStateMistake;

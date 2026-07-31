import React, { useState } from 'react';

function List() {
  const [items, setItems] = useState(["a", "b"]);

  // INCORRECT: Mutating the existing array
  function addItemIncorrect() {
    items.push("c");        // mutate existing array
    setItems(items);        // same reference → no re-render
  }

  // CORRECT: Creating a new array reference
  function addItemCorrect() {
    setItems([...items, "c"]); // new reference → triggers re-render
  }

  return (
    <div>
      <h2>Mutating State Example</h2>
      <div>
        <button onClick={addItemIncorrect}>
          Add Item (Incorrect - Mutates State)
        </button>
        <button onClick={addItemCorrect}>
          Add Item (Correct - Immutable)
        </button>
      </div>
      
      <h3>Items:</h3>
      <ul>
        {items.map((i, index) => (
          // Using index as key here since items might have duplicates ('c')
          <li key={index}>{i}</li> 
        ))}
      </ul>
      <p>
        <em>Note: If you click the incorrect button, the item is added to the array under the hood, but the UI won't update because React doesn't detect a change in the array's reference. Clicking the correct button afterwards will force a re-render and suddenly reveal all the hidden "c"s!</em>
      </p>
    </div>
  );
}

export default List;

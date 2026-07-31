import React, { useState } from 'react';

function List() {
  const [items, setItems] = useState(["a", "b"]);

  function addItemIncorrect() {
    items.push("c");
    setItems(items);
  }

  function addItemCorrect() {
    setItems([...items, "c"]);
  }

  return (
    <>
      <button onClick={addItemIncorrect}>Add (Incorrect)</button>
      <button onClick={addItemCorrect}>Add (Correct)</button>
      <ul>{items.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
    </>
  );
}

export default List;

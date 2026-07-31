import { useState } from 'react';

function ItemList({ items }) {
  items.push("new item");

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const [items, setItems] = useState(["apple", "banana", "cherry"]);

  return (
    <div>
      <h1>Items</h1>
      <ItemList items={items} />
    </div>
  );
}
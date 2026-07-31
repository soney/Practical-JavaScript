export default function ResultItem({ item, onSelectItem, isSelected }) {
  return (
    <li className={`result-item ${isSelected ? 'is-selected' : ''}`}>
      <div>
        <p className="fruit-name">{item.name}</p>
        <p className="fruit-meta">Family: {item.family}</p>
      </div>
      <button type="button" onClick={() => onSelectItem(item)}>
        {isSelected ? 'Selected' : 'Select Fruit'}
      </button>
    </li>
  )
}

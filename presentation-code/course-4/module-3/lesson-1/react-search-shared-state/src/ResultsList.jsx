import ResultItem from './ResultItem'

export default function ResultsList({ items, query, onSelectItem, selectedName }) {
  const normalizedQuery = query.trim().toLowerCase()

  const filteredItems = items.filter((item) =>
    `${item.name} ${item.family}`.toLowerCase().includes(normalizedQuery),
  )

  return (
    <ul className="results-list">
      {filteredItems.length === 0 && (
        <li className="empty-state">No fruits match that search.</li>
      )}
      {filteredItems.map((item) => (
        <ResultItem
          key={item.name}
          item={item}
          onSelectItem={onSelectItem}
          isSelected={selectedName === item.name}
        />
      ))}
    </ul>
  )
}

import { useState } from 'react'
import SearchBar from './SearchBar'
import ResultsList from './ResultsList'
import './App.css'

const ITEMS = [
  { name: 'Apple', family: 'Pome', note: 'Crisp classic fruit' },
  { name: 'Apricot', family: 'Stone Fruit', note: 'Small, sweet, and velvety' },
  { name: 'Banana', family: 'Tropical', note: 'Soft and energy-rich' },
  { name: 'Blueberry', family: 'Berry', note: 'Tiny antioxidant powerhouse' },
  { name: 'Blackberry', family: 'Berry', note: 'Deep, jammy flavor' },
  { name: 'Grape', family: 'Berry', note: 'Snackable and juicy' },
  { name: 'Grapefruit', family: 'Citrus', note: 'A fruit that starts with Grape' },
  { name: 'Orange', family: 'Citrus', note: 'Sweet citrus staple' },
  { name: 'Strawberry', family: 'Berry', note: 'Bright and fragrant' },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [appState, setAppState] = useState('idle')

  function handleSelectItem(item) {
    setQuery(item.name)
    setAppState('selected')
  }

  const selectedFruit = ITEMS.find(
    (item) => item.name.toLowerCase() === query.trim().toLowerCase(),
  )

  const sameFamily = selectedFruit
    ? ITEMS.filter(
        (item) => item.family === selectedFruit.family && item.name !== selectedFruit.name,
      )
    : []

  const startsWithSelected = selectedFruit
    ? ITEMS.filter(
        (item) =>
          item.name !== selectedFruit.name &&
          item.name.toLowerCase().startsWith(selectedFruit.name.toLowerCase()),
      )
    : []

  return (
    <main className="app-shell">
      <header>
        <h2>Fruit Finder</h2>
        {!selectedFruit && (
          <p className="subhead">Find fruits by name or family.</p>
        )}
        {selectedFruit && (
          <p className="subhead selected-subhead">
            Showing recommendations for <strong>{selectedFruit.name}</strong>.
          </p>
        )}
      </header>

      {appState === 'selected' && selectedFruit && (
        <section className="insight-panel is-selected">
          <p>
            <strong>{selectedFruit.name}</strong> is in the <strong>{selectedFruit.family}</strong>{' '}
            family.
          </p>
          <p>{selectedFruit.note}</p>

          <div className="chips-row">
            <span className="label">Same family:</span>
            {sameFamily.length === 0 && <span className="chip muted">No related fruits</span>}
            {sameFamily.map((item) => (
              <span className="chip" key={item.name}>
                {item.name}
              </span>
            ))}
          </div>

          <div className="chips-row">
            <span className="label">Name starts with selected:</span>
            {startsWithSelected.length === 0 && <span className="chip muted">No prefix matches</span>}
            {startsWithSelected.map((item) => (
              <span className="chip highlight" key={item.name}>
                {item.name}
              </span>
            ))}
          </div>
        </section>
      )}

      <SearchBar query={query} onQueryChange={setQuery} />

      <ResultsList
        items={ITEMS}
        query={query}
        onSelectItem={handleSelectItem}
        selectedName={selectedFruit?.name}
      />
    </main>
  )
}

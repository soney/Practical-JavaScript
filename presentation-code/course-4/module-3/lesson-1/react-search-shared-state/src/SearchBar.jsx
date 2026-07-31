export default function SearchBar({ query, onQueryChange }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => {
        onQueryChange(e.target.value)
      }}
      placeholder="Search..."
      className="search-input"
      aria-label="Search fruits by name or family"
    />
  )
}

function SearchBar({
  search,
  setSearch,
  onSearch,
  onClear,
}) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search location..."
        value={search.location}
        onChange={(e) =>
          setSearch({
            ...search,
            location: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Min price"
        value={search.minPrice}
        onChange={(e) =>
          setSearch({
            ...search,
            minPrice: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Max price"
        value={search.maxPrice}
        onChange={(e) =>
          setSearch({
            ...search,
            maxPrice: e.target.value,
          })
        }
      />

      <button
        className="search-btn"
        onClick={onSearch}
      >
        Search
      </button>

      <button
        className="clear-btn"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
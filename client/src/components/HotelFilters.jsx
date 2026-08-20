function HotelFilters({
  filters,
  setFilters,
  onApply,
  onClear,
}) {
  return (
    <div className="hotel-filters">
      <input
        type="text"
        placeholder="City"
        value={filters.city}
        onChange={(e) =>
          setFilters({
            ...filters,
            city: e.target.value,
          })
        }
      />

      <select
        value={filters.minStars}
        onChange={(e) =>
          setFilters({
            ...filters,
            minStars: e.target.value,
          })
        }
      >
        <option value="">Any stars</option>
        <option value="5">5+ stars</option>
        <option value="4">4+ stars</option>
        <option value="3">3+ stars</option>
        <option value="2">2+ stars</option>
        <option value="1">1+ stars</option>
      </select>

      <select
        value={filters.minRating}
        onChange={(e) =>
          setFilters({
            ...filters,
            minRating: e.target.value,
          })
        }
      >
        <option value="">Any rating</option>
        <option value="4.5">4.5+ rating</option>
        <option value="4">4+ rating</option>
        <option value="3.5">3.5+ rating</option>
        <option value="3">3+ rating</option>
      </select>

      <input
        type="text"
        placeholder="Property type"
        value={filters.propertyType}
        onChange={(e) =>
          setFilters({
            ...filters,
            propertyType: e.target.value,
          })
        }
      />

      <select
        value={filters.sortBy}
        onChange={(e) =>
          setFilters({
            ...filters,
            sortBy: e.target.value,
          })
        }
      >
        <option value="">Recommended</option>
        <option value="rating">
          Highest Guest Rating
        </option>
        <option value="reviews">
          Most Reviews
        </option>
        <option value="stars">
          Highest Stars
        </option>
        <option value="priceLow">
          Lowest Price
        </option>
        <option value="priceHigh">
          Highest Price
        </option>
      </select>

      <button
        className="search-btn"
        onClick={onApply}
      >
        Apply Filters
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

export default HotelFilters;
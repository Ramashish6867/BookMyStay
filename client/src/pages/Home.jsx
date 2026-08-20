import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import HotelFilters from "../components/HotelFilters";

function Home({
  listings,
  search,
  setSearch,
  onSearch,
  onClear,
  onViewDetails,
  filters,
  setFilters,
  onApplyFilters,
  onClearFilters,
  page,
  totalPages,
  totalListings,
  onPageChange,
}) {
  return (
    <section className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>

          <p>
            Discover comfortable stays at the best
            locations and prices.
          </p>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={onSearch}
          onClear={onClear}
        />
        <HotelFilters
  filters={filters}
  setFilters={setFilters}
  onApply={onApplyFilters}
  onClear={onClearFilters}
/>
      </div>


      <section className="listings-section">
        <div className="section-heading">
          <h2>Explore Stays</h2>
          <p>
            Choose from our available properties.
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏠</div>

            <h3>No listings found</h3>

            <p>
              Try changing your search or price
              filters.
            </p>
          </div>
        ) : (
       <div className="listing-grid">
  {listings.length === 0 ? (
    <p>No listings found.</p>
  ) : (
    listings.map((listing) => (
      <ListingCard
        key={listing._id}
        listing={listing}
        onViewDetails={onViewDetails}
      />
    ))
  )}
</div>
        )}
{ totalPages > 1 && (
  <div className="pagination">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
      className="pagination-btn"
    >
      ← Previous
    </button>

    <span className="pagination-info">
      Page {page} of {totalPages}
      <small> • {totalListings} hotels</small>
    </span>

    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page === totalPages}
      className="pagination-btn"
    >
      Next →
    </button>
  </div>
)}
      </section>
    </section>
  );
}

export default Home;
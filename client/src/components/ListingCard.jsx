function ListingCard({ listing, onViewDetails }) {
  return (
    <article className="listing-card">
      <div className="listing-image-wrapper">
        {listing.images?.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="listing-image"
          />
        ) : (
          <div className="image-placeholder">
            🏨
          </div>
        )}

        <span className="listing-location">
          📍 {listing.city || listing.location || "Unknown"}
        </span>
      </div>

      <div className="listing-content">
        <div className="hotel-title-row">
          <h3>{listing.title}</h3>

          <div className="hotel-rating-info">
  {listing.starRating > 0 && (
    <span className="hotel-stars">
      {listing.starRating}-Star Hotel
    </span>
  )}

  {listing.reviewRating > 0 && (
    <span className="guest-rating">
      ⭐ {listing.reviewRating.toFixed(1)}
    </span>
  )}
</div>
        </div>

        <p className="listing-description">
          {listing.description
            ? listing.description.slice(0, 120) +
              (listing.description.length > 120
                ? "..."
                : "")
            : "Comfortable stay with modern facilities."}
        </p>

        <div className="hotel-meta">
          {listing.reviewRating > 0 && (
            <span>
              ⭐ {listing.reviewRating.toFixed(1)}
            </span>
          )}

          {listing.reviewCount > 0 && (
            <span>
              {listing.reviewCount} reviews
            </span>
          )}

          {listing.roomCount > 0 && (
            <span>
              🛏 {listing.roomCount} rooms
            </span>
          )}
        </div>
  {listing.price <= 0 && (
  <div className="info-badge">
    ℹ️ Informational listing
  </div>
)}
       <div className="listing-footer">
  <div className="price">
  {listing.price > 0 ? (
    <>
      ₹{listing.price}
      <span> / night</span>

      {listing.priceType === "demo" }
    </>
  ) : (
    <span className="price-unavailable">
      Price unavailable
    </span>
  )}
</div>

  <button
    className="view-btn"
    onClick={() => onViewDetails(listing)}
  >
    View Details
  </button>
</div>
      </div>
    </article>
  );
}

export default ListingCard;
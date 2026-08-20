function ListingDetails({
  listing,
  booking,
  onBookingChange,
  onBooking,
  onBack,
  message,
}) {
  if (!listing) {
    return (
      <section className="details-page">
        <button className="back-btn" onClick={onBack}>
          ← Back to Listings
        </button>

        <p>Listing not found.</p>
      </section>
    );
  }

  return (
    <section className="details-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Listings
      </button>

      {/* HEADER */}
      <div className="hotel-header-card">
        <div className="hotel-visual">
          {listing.images?.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
            />
          ) : (
            <div className="hotel-placeholder">
              <span>🏨</span>
            </div>
          )}
        </div>

        <div className="hotel-header-content">
          <div className="hotel-title-line">
            <h1>{listing.title}</h1>

            {listing.starRating > 0 && (
              <span className="large-rating">
                ⭐ {listing.starRating}
              </span>
            )}
          </div>

          <p className="hotel-location">
            📍 {listing.city || listing.location}
          </p>

          {listing.address && (
            <p className="hotel-address">
              {listing.address}
            </p>
          )}

          <div className="hotel-summary">
            {listing.reviewRating > 0 && (
              <span>
                ⭐ {listing.reviewRating.toFixed(1)} rating
              </span>
            )}

            {listing.reviewCount > 0 && (
              <span>
                {listing.reviewCount} reviews
              </span>
            )}

            {listing.propertyType && (
              <span>{listing.propertyType}</span>
            )}

            {listing.roomCount > 0 && (
              <span>🛏 {listing.roomCount} rooms</span>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="hotel-details-layout">
        <div className="hotel-information">
          {/* ABOUT */}
          {listing.description && (
  <div className="hotel-section">
    <h2>About this property</h2>
    <p className="hotel-description">
      {listing.description}
    </p>
  </div>
)}

{listing.additionalInfo && (
  <div className="hotel-section">
    <h2>Hotel Policies</h2>
    <p className="hotel-description">
      {listing.additionalInfo}
    </p>
  </div>
)}

          {/* ROOM */}
          {listing.roomType && (
            <div className="hotel-section">
              <h2>Room Information</h2>

              <div className="room-info">
                <div>
                  <span>Room Type</span>
                  <strong>{listing.roomType}</strong>
                </div>

                {listing.roomCount > 0 && (
                  <div>
                    <span>Total Rooms</span>
                    <strong>{listing.roomCount}</strong>
                  </div>
                )}

                {listing.roomArea && (
                  <div>
                    <span>Room Area</span>
                    <strong>{listing.roomArea}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HOTEL FACILITIES */}
          {listing.hotelFacilities?.length > 0 && (
            <div className="hotel-section">
              <h2>Hotel Facilities</h2>

              <div className="facility-grid">
                {listing.hotelFacilities
                  .slice(0, 18)
                  .map((facility, index) => (
                    <div
                      className="facility-item"
                      key={index}
                    >
                      <span>✓</span>
                      {facility}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ROOM FACILITIES */}
          {listing.roomFacilities?.length > 0 && (
            <div className="hotel-section">
              <h2>Room Facilities</h2>

              <div className="facility-grid">
                {listing.roomFacilities
                  .slice(0, 18)
                  .map((facility, index) => (
                    <div
                      className="facility-item"
                      key={index}
                    >
                      <span>✓</span>
                      {facility}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* NEARBY PLACES */}
          {listing.pointsOfInterest?.length > 0 && (
            <div className="hotel-section">
              <h2>Nearby Places</h2>

              <div className="nearby-grid">
                {listing.pointsOfInterest
                  .slice(0, 10)
                  .map((place, index) => (
                    <div
                      className="nearby-item"
                      key={index}
                    >
                      📍 {place}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* LOCATION */}
          {listing.latitude &&
            listing.longitude && (
              <div className="hotel-section">
                <h2>Location</h2>

                <div className="coordinates">
                  <span>Latitude</span>
                  <strong>{listing.latitude}</strong>

                  <span>Longitude</span>
                  <strong>{listing.longitude}</strong>
                </div>
              </div>
            )}
        </div>

        {/* BOOKING PANEL */}
        <aside className="booking-panel">
          <div className="booking-panel-inner">
            <h2>Book Your Stay</h2>

            {listing.price > 0 ? (
              <div className="booking-price">
                ₹{listing.price}
                <span> / night</span>
              </div>
            ) : (
              <div className="booking-price unavailable">
                Price unavailable
              </div>
            )}

            <div className="date-field">
              <label htmlFor="checkIn">
                Check-in date
              </label>

              <div className="date-input-wrapper">
                <span className="date-icon">📅</span>

                <input
                  id="checkIn"
                  type="date"
                  name="checkIn"
                  value={booking.checkIn}
                  onChange={onBookingChange}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>
            </div>

            <div className="date-field">
              <label htmlFor="checkOut">
                Check-out date
              </label>

              <div className="date-input-wrapper">
                <span className="date-icon">📅</span>

                <input
                  id="checkOut"
                  type="date"
                  name="checkOut"
                  value={booking.checkOut}
                  onChange={onBookingChange}
                  min={
                    booking.checkIn || undefined
                  }
                />
              </div>
            </div>
     
     {listing.price <= 0 && (
  <p className="price-notice">
    Pricing is currently unavailable for this property.
  </p>
)}
           {listing.price > 0 ? (
            
  <button
    className="book-btn booking-main-btn"
    onClick={onBooking}
  >
    Book Now
  </button>
) : (
  
  <button
    className="book-btn booking-main-btn unavailable-btn"
    disabled
  >
    Booking unavailable
  </button>
)}

            {message && (
              <p className="message">{message}</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ListingDetails;
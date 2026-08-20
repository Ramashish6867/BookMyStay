function MyBookings({
  bookings,
  editingBooking,
  editDates,
  setEditingBooking,
  setEditDates,
  onUpdate,
  onCancel,
  onBack,
  message,
}) {
  return (
    <section className="bookings-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Listings
      </button>

      <div className="bookings-header">
        <h2>My Bookings</h2>
        <p>Manage your upcoming stays.</p>
      </div>

      {message && <p className="message">{message}</p>}

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No bookings yet</h3>
          <p>Book a stay and it will appear here.</p>

          <button
            className="view-btn"
            onClick={onBack}
          >
            Explore Stays
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <article
              className="booking-card"
              key={booking._id}
            >
              <div className="booking-image">
                {booking.listingId?.images?.length > 0 ? (
                  <img
                    src={booking.listingId.images[0]}
                    alt={booking.listingId.title}
                  />
                ) : (
                  <div className="image-placeholder">
                    🏠
                  </div>
                )}
              </div>

              <div className="booking-content">
                <div className="booking-top">
                  <div>
                    <h3>
                      {booking.listingId?.title}
                    </h3>

                    <p className="booking-location">
                      📍 {booking.listingId?.location}
                    </p>
                  </div>

                  <span className="booking-status">
                    Confirmed
                  </span>
                </div>

                <div className="booking-dates">
                  <div>
                    <span>Check-in</span>
                    <strong>
                      {new Date(
                        booking.checkIn
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>

                  <div>
                    <span>Check-out</span>
                    <strong>
                      {new Date(
                        booking.checkOut
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>
                </div>

                <div className="booking-bottom">
                  <div className="booking-price">
                    ₹{booking.listingId?.price}
                    <span> / night</span>
                  </div>

                  <div className="booking-actions">
                    <button
                      className="update-btn"
                      onClick={() => {
                        setEditingBooking(booking);

                        setEditDates({
                          checkIn:
                            booking.checkIn?.substring(
                              0,
                              10
                            ) || "",
                          checkOut:
                            booking.checkOut?.substring(
                              0,
                              10
                            ) || "",
                        });
                      }}
                    >
                      Update
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() =>
                        onCancel(booking._id)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {editingBooking?._id ===
                  booking._id && (
                  <div className="edit-booking">
                    <h4>Update Booking Dates</h4>

                    <label>Check-in</label>

                    <input
                      type="date"
                      value={editDates.checkIn}
                      onChange={(e) =>
                        setEditDates({
                          ...editDates,
                          checkIn: e.target.value,
                        })
                      }
                    />

                    <label>Check-out</label>

                    <input
                      type="date"
                      value={editDates.checkOut}
                      onChange={(e) =>
                        setEditDates({
                          ...editDates,
                          checkOut: e.target.value,
                        })
                      }
                    />

                    <button
                      className="primary-btn"
                      onClick={onUpdate}
                    >
                      Save Changes
                    </button>

                    <button
                      className="switch-btn"
                      onClick={() =>
                        setEditingBooking(null)
                      }
                    >
                      Cancel Edit
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBookings;
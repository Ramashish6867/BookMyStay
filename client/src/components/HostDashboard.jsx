function HostDashboard({
  hostListings,
  listingForm,
  editingListing,
  message,
  onListingChange,
  onCreate,
  onUpdate,
  onEdit,
  onDelete,
  onCancelEdit,
  onBack,
}) {
  return (
    <section className="host-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Listings
      </button>

      <div className="host-header">
        <div>
          <h2>Host Dashboard</h2>
          <p>Manage your properties and listings.</p>
        </div>

        <div className="host-stats">
          <div className="stat-card">
            <strong>{hostListings.length}</strong>
            <span>Total Listings</span>
          </div>
        </div>
      </div>

      {message && (
        <p className="message">{message}</p>
      )}

      <div className="host-form-card">
        <div className="host-form-header">
          <h3>
            {editingListing
              ? "Edit Property"
              : "Add New Property"}
          </h3>

          <p>
            {editingListing
              ? "Update your property details."
              : "Add a new stay for guests to book."}
          </p>
        </div>

        <form
          onSubmit={
            editingListing ? onUpdate : onCreate
          }
          className="host-form"
        >
          <div className="form-row">
            <div className="form-group">
              <label>Property Title</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Beautiful Delhi Apartment"
                value={listingForm.title}
                onChange={onListingChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Delhi"
                value={listingForm.location}
                onChange={onListingChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price per Night</label>

              <input
                type="number"
                name="price"
                placeholder="2500"
                min="0"
                value={listingForm.price}
                onChange={onListingChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URLs</label>

              <input
                type="text"
                name="images"
                placeholder="URL1, URL2, URL3"
                value={listingForm.images}
                onChange={onListingChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe your property..."
              value={listingForm.description}
              onChange={onListingChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-btn"
            >
              {editingListing
                ? "Save Changes"
                : "Create Property"}
            </button>

            {editingListing && (
              <button
                type="button"
                className="switch-btn"
                onClick={onCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="my-properties">
        <div className="section-heading">
          <h3>My Properties</h3>
          <p>
            Properties currently listed on BookMyStay.
          </p>
        </div>

        {hostListings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏠</div>

            <h3>No properties yet</h3>

            <p>
              Create your first property using the
              form above.
            </p>
          </div>
        ) : (
          <div className="listing-grid">
            {hostListings.map((listing) => (
              <article
                className="listing-card"
                key={listing._id}
              >
                <div className="listing-image-wrapper">
                  {listing.images?.length > 0 ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="listing-image"
                    />
                  ) : (
                    <div className="image-placeholder">
                      🏠
                    </div>
                  )}

                  <span className="listing-location">
                    📍 {listing.location}
                  </span>
                </div>

                <div className="listing-content">
                  <h3>{listing.title}</h3>

                  <p className="listing-description">
                    {listing.description}
                  </p>

                  <div className="host-listing-footer">
                    <div className="price">
                      ₹{listing.price}
                      <span> / night</span>
                    </div>

                    <div className="booking-actions">
                      <button
                        className="update-btn"
                        onClick={() =>
                          onEdit(listing)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() =>
                          onDelete(listing._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HostDashboard;
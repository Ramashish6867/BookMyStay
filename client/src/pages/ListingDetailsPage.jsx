import ListingDetails from "../components/ListingDetails";

function ListingDetailsPage({
  listing,
  booking,
  onBookingChange,
  onBooking,
  onBack,
  message,
}) {
  return (
    <ListingDetails
      listing={listing}
      booking={booking}
      onBookingChange={onBookingChange}
      onBooking={onBooking}
      onBack={onBack}
      message={message}
    />
  );
}

export default ListingDetailsPage;
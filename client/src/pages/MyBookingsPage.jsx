import MyBookings from "../components/MyBookings";

function MyBookingsPage({
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
    <MyBookings
      bookings={bookings}
      editingBooking={editingBooking}
      editDates={editDates}
      setEditingBooking={setEditingBooking}
      setEditDates={setEditDates}
      onUpdate={onUpdate}
      onCancel={onCancel}
      onBack={onBack}
      message={message}
    />
  );
}

export default MyBookingsPage;
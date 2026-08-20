import HostDashboard from "../components/HostDashboard";

function HostDashboardPage({
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
    <HostDashboard
      hostListings={hostListings}
      listingForm={listingForm}
      editingListing={editingListing}
      message={message}
      onListingChange={onListingChange}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onEdit={onEdit}
      onDelete={onDelete}
      onCancelEdit={onCancelEdit}
      onBack={onBack}
    />
  );
}

export default HostDashboardPage;
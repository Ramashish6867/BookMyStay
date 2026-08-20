import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "./services/api";
import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import HostDashboardPage from "./pages/HostDashboardPage";

function ListingDetailsRoute({
  booking,
  onBookingChange,
  onBooking,
  message,
}) {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await API.get(`/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <p>Loading property...</p>;
  }

  if (!listing) {
    return <p>Listing not found.</p>;
  }

  return (
    <ListingDetailsPage
      listing={listing}
      booking={booking}
      onBookingChange={onBookingChange}
      onBooking={() => onBooking(listing._id)}
      onBack={() => window.history.back()}
      message={message}
    />
  );
}

function App() {
  const navigate = useNavigate();

  /* -------------------- Pagination -------------------- */

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalListings, setTotalListings] = useState(0);

  const ITEMS_PER_PAGE = 20;

  /* -------------------- Listings -------------------- */

  const [listings, setListings] = useState([]);

  const [search, setSearch] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const [filters, setFilters] = useState({
    city: "",
    minStars: "",
    minRating: "",
    propertyType: "",
    sortBy: "",
  });

  /* -------------------- Auth -------------------- */

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [message, setMessage] = useState("");

  /* -------------------- Bookings -------------------- */

  const [myBookings, setMyBookings] = useState([]);

  const [editingBooking, setEditingBooking] = useState(null);

  const [editDates, setEditDates] = useState({
    checkIn: "",
    checkOut: "",
  });

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
  });

  /* -------------------- Host -------------------- */

  const [hostListings, setHostListings] = useState([]);

  const [listingForm, setListingForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    images: "",
  });

  const [editingListing, setEditingListing] = useState(null);

  /* =====================================================
     COMMON LISTING FETCH
  ===================================================== */

  const fetchListings = async (
    pageNumber = 1,
    extraParams = {}
  ) => {
    try {
      const response = await API.get("/listings", {
        params: {
          page: pageNumber,
          limit: ITEMS_PER_PAGE,
          ...extraParams,
        },
      });

      setListings(response.data.listings);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setTotalListings(response.data.total);

      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to load listings.");
    }
  };

  /* Initial load */

  useEffect(() => {
    fetchListings(1);
  }, []);

  /* =====================================================
     AUTH
  ===================================================== */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuth = async (e, type) => {
    e.preventDefault();
    setMessage("");

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (type === "register" && !form.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    try {
      let response;

      if (type === "register") {
        response = await API.post("/auth/register", {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });
      } else {
        response = await API.post("/auth/login", {
          email: form.email.trim(),
          password: form.password,
        });
      }

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setMessage(
        type === "register"
          ? "Registration successful!"
          : "Login successful!"
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMessage("");

    navigate("/login", { replace: true });
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const searchListings = async () => {
    const params = {};

    if (search.location) {
      params.location = search.location;
    }

    if (search.minPrice) {
      params.minPrice = search.minPrice;
    }

    if (search.maxPrice) {
      params.maxPrice = search.maxPrice;
    }

    if (filters.city) {
      params.city = filters.city;
    }

    if (filters.minStars) {
      params.minStars = filters.minStars;
    }

    if (filters.minRating) {
      params.minRating = filters.minRating;
    }

    if (filters.propertyType) {
      params.propertyType = filters.propertyType;
    }

    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
    }

    await fetchListings(1, params);
  };

  const clearSearch = async () => {
    setSearch({
      location: "",
      minPrice: "",
      maxPrice: "",
    });

    const params = {};

    if (filters.city) {
      params.city = filters.city;
    }

    if (filters.minStars) {
      params.minStars = filters.minStars;
    }

    if (filters.minRating) {
      params.minRating = filters.minRating;
    }

    if (filters.propertyType) {
      params.propertyType = filters.propertyType;
    }

    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
    }

    await fetchListings(1, params);
  };

  /* =====================================================
     HOTEL FILTERS
  ===================================================== */

  const applyHotelFilters = async () => {
    const params = {};

    if (search.location) {
      params.location = search.location;
    }

    if (search.minPrice) {
      params.minPrice = search.minPrice;
    }

    if (search.maxPrice) {
      params.maxPrice = search.maxPrice;
    }

    if (filters.city) {
      params.city = filters.city;
    }

    if (filters.minStars) {
      params.minStars = filters.minStars;
    }

    if (filters.minRating) {
      params.minRating = filters.minRating;
    }

    if (filters.propertyType) {
      params.propertyType = filters.propertyType;
    }

    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
    }

    await fetchListings(1, params);
  };

  const clearHotelFilters = async () => {
    setFilters({
      city: "",
      minStars: "",
      minRating: "",
      propertyType: "",
      sortBy: "",
    });

    const params = {};

    if (search.location) {
      params.location = search.location;
    }

    if (search.minPrice) {
      params.minPrice = search.minPrice;
    }

    if (search.maxPrice) {
      params.maxPrice = search.maxPrice;
    }

    await fetchListings(1, params);
  };

  /* =====================================================
     PAGINATION
  ===================================================== */

  const changePage = async (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    const params = {};

    if (search.location) {
      params.location = search.location;
    }

    if (search.minPrice) {
      params.minPrice = search.minPrice;
    }

    if (search.maxPrice) {
      params.maxPrice = search.maxPrice;
    }

    if (filters.city) {
      params.city = filters.city;
    }

    if (filters.minStars) {
      params.minStars = filters.minStars;
    }

    if (filters.minRating) {
      params.minRating = filters.minRating;
    }

    if (filters.propertyType) {
      params.propertyType = filters.propertyType;
    }

    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
    }

    await fetchListings(newPage, params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     BOOKINGS
  ===================================================== */

  const fetchMyBookings = async () => {
    try {
      const response = await API.get(
        "/bookings/my-bookings"
      );

      setMyBookings(response.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to fetch bookings.");
    }
  };

  const handleBookingChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (listingId) => {
    if (!user) {
      setMessage("Please login before booking.");
      navigate("/login");
      return;
    }

    if (
      !booking.checkIn ||
      !booking.checkOut
    ) {
      setMessage(
        "Please select both check-in and check-out dates."
      );
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);

    if (checkInDate < today) {
      setMessage(
        "Check-in date cannot be in the past."
      );
      return;
    }

    if (checkOutDate <= checkInDate) {
      setMessage(
        "Check-out must be after check-in."
      );
      return;
    }

    try {
      await API.post("/bookings", {
        listingId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      });

      setMessage("Booking successful!");

      setBooking({
        checkIn: "",
        checkOut: "",
      });
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Booking failed. Please try again."
      );
    }
  };

  const updateBooking = async () => {
    if (!editingBooking) return;

    if (
      !editDates.checkIn ||
      !editDates.checkOut
    ) {
      setMessage(
        "Please select both dates."
      );
      return;
    }

    if (
      editDates.checkOut <= editDates.checkIn
    ) {
      setMessage(
        "Check-out must be after check-in."
      );
      return;
    }

    try {
      await API.put(
        `/bookings/${editingBooking._id}`,
        {
          checkIn: editDates.checkIn,
          checkOut: editDates.checkOut,
        }
      );

      setMessage(
        "Booking updated successfully!"
      );

      setEditingBooking(null);

      await fetchMyBookings();
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to update booking."
      );
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      await API.delete(
        `/bookings/${bookingId}`
      );

      setMessage(
        "Booking cancelled successfully!"
      );

      await fetchMyBookings();
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to cancel booking."
      );
    }
  };

  /* =====================================================
     HOST LISTINGS
  ===================================================== */

  const fetchHostListings = async () => {
    try {
      const response = await API.get(
        "/listings/my-listing"
      );

      setHostListings(response.data);
      setMessage("");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to load your listings."
      );
    }
  };

  const handleListingChange = (e) => {
    setListingForm({
      ...listingForm,
      [e.target.name]: e.target.value,
    });
  };

  const createListing = async (e) => {
    e.preventDefault();

    if (!listingForm.title.trim()) {
      setMessage(
        "Property title is required."
      );
      return;
    }

    if (!listingForm.description.trim()) {
      setMessage(
        "Property description is required."
      );
      return;
    }

    if (!listingForm.location.trim()) {
      setMessage(
        "Property location is required."
      );
      return;
    }

    const price = Number(listingForm.price);

    if (
      !listingForm.price ||
      Number.isNaN(price) ||
      price <= 0
    ) {
      setMessage(
        "Price must be greater than 0."
      );
      return;
    }

    try {
      const response = await API.post(
        "/listings",
        {
          title: listingForm.title,
          description: listingForm.description,
          location: listingForm.location,
          price,
          priceType: "real",
          images: listingForm.images
            ? listingForm.images
                .split(",")
                .map((url) => url.trim())
            : [],
        }
      );

      setHostListings([
        ...hostListings,
        response.data,
      ]);

      setListingForm({
        title: "",
        description: "",
        location: "",
        price: "",
        images: "",
      });

      setMessage(
        "Listing created successfully!"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to create listing."
      );
    }
  };

  const startEditingListing = (listing) => {
    setEditingListing(listing);

    setListingForm({
      title: listing.title || "",
      description: listing.description || "",
      location: listing.location || "",
      price: listing.price || "",
      images: listing.images
        ? listing.images.join(", ")
        : "",
    });
  };

  const updateListing = async (e) => {
    e.preventDefault();

    if (!listingForm.title.trim()) {
      setMessage(
        "Property title is required."
      );
      return;
    }

    if (!listingForm.description.trim()) {
      setMessage(
        "Property description is required."
      );
      return;
    }

    if (!listingForm.location.trim()) {
      setMessage(
        "Property location is required."
      );
      return;
    }

    const price = Number(listingForm.price);

    if (
      !listingForm.price ||
      Number.isNaN(price) ||
      price <= 0
    ) {
      setMessage(
        "Price must be greater than 0."
      );
      return;
    }

    try {
      const response = await API.put(
        `/listings/${editingListing._id}`,
        {
          title: listingForm.title,
          description: listingForm.description,
          location: listingForm.location,
          price,
          priceType: "real",
          images: listingForm.images
            ? listingForm.images
                .split(",")
                .map((url) => url.trim())
            : [],
        }
      );

      setHostListings(
        hostListings.map((listing) =>
          listing._id ===
          editingListing._id
            ? response.data
            : listing
        )
      );

      setEditingListing(null);

      setListingForm({
        title: "",
        description: "",
        location: "",
        price: "",
        images: "",
      });

      setMessage(
        "Listing updated successfully!"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to update listing."
      );
    }
  };

  const deleteListing = async (listingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    try {
      await API.delete(
        `/listings/${listingId}`
      );

      setHostListings(
        hostListings.filter(
          (listing) =>
            listing._id !== listingId
        )
      );

      setMessage(
        "Listing deleted successfully!"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to delete listing."
      );
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="app">
      <Navbar
        user={user}
        onHostDashboard={async () => {
          await fetchHostListings();
          navigate("/host/dashboard");
        }}
        onMyBookings={async () => {
          await fetchMyBookings();
          navigate("/my-bookings");
        }}
        onLogout={logout}
      />

      <main>
        <Routes>
          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <Login
                form={form}
                handleChange={handleChange}
                handleAuth={handleAuth}
                onSwitch={() =>
                  navigate("/register")
                }
                message={message}
              />
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              <Register
                form={form}
                handleChange={handleChange}
                handleAuth={handleAuth}
                onSwitch={() =>
                  navigate("/login")
                }
                message={message}
              />
            }
          />

          {/* HOME */}
          <Route
            path="/"
            element={
              <Home
                listings={listings}
                search={search}
                setSearch={setSearch}
                onSearch={searchListings}
                onClear={clearSearch}
                onViewDetails={(listing) => {
                  navigate(
                    `/listing/${listing._id}`
                  );
                }}
                filters={filters}
                setFilters={setFilters}
                onApplyFilters={
                  applyHotelFilters
                }
                onClearFilters={
                  clearHotelFilters
                }
                page={page}
                totalPages={totalPages}
                totalListings={totalListings}
                onPageChange={changePage}
              />
            }
          />

          {/* LISTING DETAILS */}
          <Route
            path="/listing/:id"
            element={
              <ListingDetailsRoute
                booking={booking}
                onBookingChange={
                  handleBookingChange
                }
                onBooking={handleBooking}
                message={message}
              />
            }
          />

          {/* MY BOOKINGS */}
          <Route
            path="/my-bookings"
            element={
              user ? (
                <MyBookingsPage
                  bookings={myBookings}
                  editingBooking={
                    editingBooking
                  }
                  editDates={editDates}
                  setEditingBooking={
                    setEditingBooking
                  }
                  setEditDates={setEditDates}
                  onUpdate={updateBooking}
                  onCancel={cancelBooking}
                  onBack={() =>
                    navigate("/")
                  }
                  message={message}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* HOST DASHBOARD */}
          <Route
            path="/host/dashboard"
            element={
              user?.isHost ? (
                <HostDashboardPage
                  hostListings={hostListings}
                  listingForm={listingForm}
                  editingListing={
                    editingListing
                  }
                  message={message}
                  onListingChange={
                    handleListingChange
                  }
                  onCreate={createListing}
                  onUpdate={updateListing}
                  onEdit={
                    startEditingListing
                  }
                  onDelete={deleteListing}
                  onCancelEdit={() => {
                    setEditingListing(null);

                    setListingForm({
                      title: "",
                      description: "",
                      location: "",
                      price: "",
                      images: "",
                    });
                  }}
                  onBack={() =>
                    navigate("/")
                  }
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
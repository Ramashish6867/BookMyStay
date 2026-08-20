import { useNavigate } from "react-router-dom";

function Navbar({
  user,
  onHostDashboard,
  onMyBookings,
  onLogout,
  mode,
}) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        onClick={() => navigate("/")}
      >
       <span className="brand-icon">🏠</span>
<span>BookMyStay</span>
      </div>

      <div className="navbar-actions">
        {!user ? (
          <>
            <button
              className="nav-btn secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="nav-btn primary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="welcome-text">
              Welcome, {user.name}
            </span>

            {user.isHost && (
              <button
                className="nav-btn"
                onClick={onHostDashboard}
              >
                Host Dashboard
              </button>
            )}

            <button
              className="nav-btn"
              onClick={onMyBookings}
            >
              My Bookings
            </button>

            <button
              className="nav-btn logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
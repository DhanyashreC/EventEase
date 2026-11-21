import { Link } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-symbol">✦</span>
        <span>
          event<span className="logo-highlight">ease</span>
        </span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Explore</Link>
        <a href="#categories">Categories</a>

        {token && <Link to="/my-bookings">My Bookings</Link>}
      </div>

      <div className="nav-actions">
        {!token ? (
          <>
            <Link to="/login" className="nav-login">
              Login
            </Link>

            <Link to="/register" className="nav-signup">
              Get Started
              <ArrowUpRight size={16} />
            </Link>
          </>
        ) : (
          <Link to="/my-bookings" className="nav-signup">
            My Bookings
          </Link>
        )}
      </div>

      <button className="mobile-menu" aria-label="Open menu">
        <Menu size={22} />
      </button>
    </nav>
  );
}

export default Navbar;
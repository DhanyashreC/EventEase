import { Link } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-symbol">✦</span>
        <span>event<span className="logo-highlight">ease</span></span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Explore</Link>
        <a href="#categories">Categories</a>
      </div>

      <div className="nav-actions">
        <Link to="/login" className="nav-login">
          Login
        </Link>

        <Link to="/register" className="nav-signup">
          Get Started
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <button className="mobile-menu" aria-label="Open menu">
        <Menu size={22} />
      </button>
    </nav>
  );
}

export default Navbar;
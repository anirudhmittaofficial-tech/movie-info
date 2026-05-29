// ===== Navbar Component =====
// The main navigation bar at the top of every page.
//
// Concepts Used:
// - useState (scroll state, sidebar open)
// - useEffect (scroll listener, close sidebar on route change)
// - useContext (WatchlistContext for count, AuthContext for login state)
// - Conditional Rendering (show Sign In or Sign Out based on login)
// - Event Handling (onClick, scroll)

import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import WatchlistContext from '../../context/WatchlistContext';
import AuthContext from '../../context/AuthContext';
import MobileSidebar from '../MobileSidebar/MobileSidebar';
import { NAV_LINKS } from '../../utils/constants';
import './Navbar.css';

function Navbar({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get watchlist count from context
  const { watchlistCount } = useContext(WatchlistContext);

  // Get auth state from context
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Add background to navbar when user scrolls down
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Handle logout: clear auth and go to home
  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner container">

          {/* Hamburger button — mobile only */}
          <button
            className="navbar__hamburger btn-ghost"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            id="hamburger-btn"
          >
            <span className="material-icons-round">menu</span>
          </button>

          {/* Logo */}
          <Link to="/" className="navbar__logo" id="nav-logo">
            <span className="navbar__logo-icon">🎬</span>
            <span className="navbar__logo-text">
              MOVIE <span className="navbar__logo-accent">Info</span>
            </span>
          </Link>

          {/* Nav links — desktop only */}
          <ul className="navbar__links" id="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                  {/* Show count badge on Watchlist link */}
                  {link.label === 'Watchlist' && watchlistCount > 0 && (
                    <span className="navbar__badge">{watchlistCount}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Search + Auth */}
          <div className="navbar__actions">

            {/* Search button */}
            <button
              className="navbar__search-btn btn-ghost"
              onClick={onSearchOpen}
              aria-label="Open search"
              id="search-btn"
            >
              <span className="material-icons-round">search</span>
            </button>

            {/* If logged in: show username + Sign Out button */}
            {isLoggedIn ? (
              <div className="navbar__user-menu" id="user-menu">
                <span className="navbar__username">
                  {user?.username || user?.email || 'User'}
                </span>
                <button
                  className="btn btn-secondary navbar__signin-btn"
                  onClick={handleLogout}
                  id="logout-btn"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              /* If not logged in: show Sign In button */
              <Link
                to="/signin"
                className="btn btn-primary navbar__signin-btn"
                id="signin-nav-btn"
              >
                Sign In
              </Link>
            )}

          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navLinks={NAV_LINKS}
        watchlistCount={watchlistCount}
      />
    </>
  );
}

export default Navbar;

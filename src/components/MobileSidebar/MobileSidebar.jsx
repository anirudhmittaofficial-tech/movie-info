

import { Link } from 'react-router-dom';
import './MobileSidebar.css';

function MobileSidebar({ isOpen, onClose, navLinks, watchlistCount }) {

  return (
    <>
      {/* Overlay backdrop — clicking it closes the sidebar */}
      <div
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

   
      <aside className={`mobile-sidebar ${isOpen ? 'mobile-sidebar--open' : ''}`} id="mobile-sidebar">
       
        <div className="mobile-sidebar__header">
          <span className="mobile-sidebar__logo">
            <span className="mobile-sidebar__logo-icon">🎬</span>
            MOVIE <span className="mobile-sidebar__logo-accent">Info</span>
          </span>
          <button className="mobile-sidebar__close btn-ghost" onClick={onClose} aria-label="Close menu">
            <span className="material-icons-round">close</span>
          </button>
        </div>


        {/* Navigation links — rendered from list using map */}
        <nav className="mobile-sidebar__nav">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="mobile-sidebar__link"
              onClick={onClose}
            >
              <span className="material-icons-round">
                {link.label === 'Movies' ? 'movie' :
                 link.label === 'TV Shows' ? 'tv' :
                 link.label === 'Celebs' ? 'people' :
                 'bookmark'}
              </span>
              {link.label}
              {link.label === 'Watchlist' && watchlistCount > 0 && (
                <span className="navbar__badge">{watchlistCount}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mobile-sidebar__footer" />
      </aside>
    </>
  );
}

export default MobileSidebar;

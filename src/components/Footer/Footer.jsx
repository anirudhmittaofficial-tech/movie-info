

import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer__inner container">
        {/* Top section with columns */}
        <div className="footer__top">
          {/* Brand column */}
          <div className="footer__brand">
            <span className="footer__logo">
              <span className="footer__logo-icon">🎬</span>
              MOVIE <span className="footer__logo-accent">Info</span>
            </span>
            <p className="footer__tagline">Your ultimate digital theater experience.</p>
          </div>

          {/* Explore links */}
          <div className="footer__links-group">
            <h4 className="footer__heading">Explore</h4>
            <ul className="footer__links">
              <li><Link to="/">Movies</Link></li>
              <li><Link to="/?section=tvshows">TV Shows</Link></li>
              <li><Link to="/?section=celebs">Celebs</Link></li>
              <li><Link to="/watchlist">Watchlist</Link></li>
            </ul>
          </div>

          {/* Resources links */}
          <div className="footer__links-group">
            <h4 className="footer__heading">Resources</h4>
            <ul className="footer__links">
              <li><a href="#help">Help</a></li>
              <li><a href="#site-index">Site Index</a></li>
              <li><a href="#imdbpro">Movie Info Pro</a></li>
              <li><a href="#box-office">Box Office Mojo</a></li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="footer__links-group">
            <h4 className="footer__heading">Legal</h4>
            <ul className="footer__links">
              <li><a href="#license">License</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright">© 2024 MOVIE Info, Inc. A Digital Theater Experience.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

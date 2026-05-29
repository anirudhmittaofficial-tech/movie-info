

import { Link } from 'react-router-dom';
import { getBackdropUrl } from '../../api/tmdb';
import { truncateText, extractYear, formatRating } from '../../utils/helpers';
import './HeroSection.css';

// Props:
//   movie (object) — the movie data to display
//   onWatchlistToggle (function) — called when watchlist button is clicked
//   isInWatchlist (boolean) — whether this movie is already in the watchlist
function HeroSection({ movie, onWatchlistToggle, isInWatchlist }) {
  // Return null if no movie data (conditional rendering)
  if (!movie) return null;

  // Derive display values from movie data
  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const title = movie.title || movie.name || 'Untitled';
  const rating = formatRating(movie.vote_average);
  const year = extractYear(movie.release_date || movie.first_air_date);
  const overview = truncateText(movie.overview, 200);

  return (
    <section className="hero-section" id="hero-section">
      {/* Backdrop Image — conditional rendering with && */}
      {backdropUrl && (
        <div className="hero-section__backdrop">
          <img
            src={backdropUrl}
            alt=""
            className="hero-section__backdrop-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="hero-section__gradient" />

      {/* Content */}
      <div className="hero-section__content container">
        {/* Movie metadata chips */}
        <div className="hero-section__meta">
          <span className="chip">{year}</span>
          <span className="rating-badge">
            <span className="material-icons-round star">star</span>
            {rating}
          </span>
        </div>

        {/* Movie title */}
        <h1 className="hero-section__title">{title}</h1>

        {/* Movie overview (truncated) */}
        <p className="hero-section__overview">{overview}</p>

        {/* Action buttons */}
        <div className="hero-section__actions">
          {/* Link to movie detail page — uses path parameters (Module-VI) */}
          <Link to={`/movie/${movie.id}`} className="btn btn-primary hero-section__btn">
            <span className="material-icons-round">play_arrow</span>
            More Info
          </Link>

          {/* Watchlist toggle — ternary operator for conditional text (Module-II) */}
          <button
            className={`btn btn-secondary hero-section__btn ${isInWatchlist ? 'hero-section__btn--saved' : ''}`}
            onClick={() => onWatchlistToggle(movie)}
          >
            <span className="material-icons-round">
              {isInWatchlist ? 'bookmark' : 'bookmark_border'}
            </span>
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

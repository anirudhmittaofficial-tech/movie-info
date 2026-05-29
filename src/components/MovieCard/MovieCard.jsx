

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../api/tmdb';
import { extractYear, formatRating } from '../../utils/helpers';
import './MovieCard.css';

// Props:
//   movie (object)           — movie data from TMDB API
//   onWatchlistToggle (func) — callback to add/remove from watchlist
//   isInWatchlist (bool)     — whether movie is in user's watchlist
function MovieCard({ movie, onWatchlistToggle, isInWatchlist }) {
  const [imgStatus, setImgStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const posterUrl = getImageUrl(movie.poster_path, 'w342');
  const title = movie.title || movie.name || 'Untitled';
  const rating = formatRating(movie.vote_average);
  const year = extractYear(movie.release_date || movie.first_air_date);

  const showPlaceholder = !posterUrl || imgStatus !== 'loaded';

  return (
    <div className="movie-card" id={`movie-card-${movie.id}`}>
      {/* Poster image with link to detail page */}
      <Link to={`/movie/${movie.id}`} className="movie-card__poster-link">
        <div className="movie-card__poster-wrap">
          {/* Poster image — hidden until successfully loaded */}
          {posterUrl && imgStatus !== 'error' && (
            <img
              src={posterUrl}
              alt={title}
              className="movie-card__poster"
              loading="lazy"
              style={imgStatus === 'loading' ? { opacity: 0 } : undefined}
              onLoad={(e) => {
                // Guard against CDN returning 200 with empty/corrupt image
                if (e.target.naturalWidth > 1) {
                  setImgStatus('loaded');
                } else {
                  setImgStatus('error');
                }
              }}
              onError={() => setImgStatus('error')}
            />
          )}
          {/* Placeholder — visible when no URL, loading, or error */}
          {showPlaceholder && (
            <div className="movie-card__poster-placeholder">
              <span className="material-icons-round">movie</span>
            </div>
          )}
          {/* Hover overlay with play icon */}
          <div className="movie-card__overlay">
            <span className="material-icons-round movie-card__play-icon">play_circle</span>
          </div>
        </div>
      </Link>

      {/* Watchlist bookmark button — conditional rendering with && */}
      {onWatchlistToggle && (
        <button
          className={`movie-card__watchlist-btn ${isInWatchlist ? 'movie-card__watchlist-btn--active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onWatchlistToggle(movie); }}
          aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <span className="material-icons-round">
            {isInWatchlist ? 'bookmark' : 'bookmark_border'}
          </span>
        </button>
      )}

      {/* Movie info section */}
      <div className="movie-card__info">
        <div className="movie-card__rating">
          <span className="material-icons-round star">star</span>
          <span>{rating}</span>
        </div>
        <Link to={`/movie/${movie.id}`} className="movie-card__title">{title}</Link>
        {year && <span className="movie-card__year">{year}</span>}
      </div>
    </div>
  );
}

export default MovieCard;


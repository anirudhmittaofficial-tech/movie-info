// ===== WatchlistPage =====
// Displays saved watchlist. Uses useContext for WatchlistContext.

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../api/tmdb';
import { extractYear, formatRating, truncateText } from '../../utils/helpers';
import WatchlistContext from '../../context/WatchlistContext';
import './WatchlistPage.css';

function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  return (
    <main className="watchlist-page" id="watchlist-page">
      <div className="watchlist-page__hero">
        <div className="container">
          <h1 className="watchlist-page__title">Your Watchlist</h1>
          <p className="watchlist-page__subtitle">Movies and TV shows you want to watch.</p>
          {watchlist.length > 0 && (
            <span className="watchlist-page__count">{watchlist.length} title{watchlist.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
      <div className="container">
        {watchlist.length === 0 ? (
          <div className="watchlist-page__empty">
            <span className="material-icons-round watchlist-page__empty-icon">bookmark_border</span>
            <h2>Your watchlist is empty</h2>
            <p>Start adding movies and shows to keep track of what you want to watch.</p>
            <Link to="/" className="btn btn-primary"><span className="material-icons-round">explore</span>Browse Movies</Link>
          </div>
        ) : (
          <div className="watchlist-page__list">
            {watchlist.map((movie) => {
              const posterUrl = getImageUrl(movie.poster_path, 'w185');
              const year = extractYear(movie.release_date);
              const rating = formatRating(movie.vote_average);
              return (
                <div key={movie.id} className="watchlist-item" id={`watchlist-item-${movie.id}`}>
                  <Link to={`/movie/${movie.id}`} className="watchlist-item__poster">
                    {posterUrl ? (<img src={posterUrl} alt={movie.title} />) : (<div className="watchlist-item__poster-placeholder"><span className="material-icons-round">movie</span></div>)}
                  </Link>
                  <div className="watchlist-item__info">
                    <Link to={`/movie/${movie.id}`} className="watchlist-item__title">{movie.title}</Link>
                    <div className="watchlist-item__meta">
                      {year && <span className="chip">{year}</span>}
                      <span className="rating-badge"><span className="material-icons-round star">star</span>{rating}</span>
                    </div>
                    {movie.overview && <p className="watchlist-item__overview">{truncateText(movie.overview, 150)}</p>}
                  </div>
                  <button className="watchlist-item__remove btn-ghost" onClick={() => removeFromWatchlist(movie.id)} aria-label={`Remove ${movie.title}`}>
                    <span className="material-icons-round">close</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default WatchlistPage;

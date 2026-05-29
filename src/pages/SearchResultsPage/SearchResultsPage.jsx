
// Concepts Used:
// - useState (results, loading, error)
// - useEffect (fetch results when query changes)
// - useLocation (read the ?q= from the URL)
// - Conditional Rendering (loading, empty, results)

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchMovies, getImageUrl } from '../../api/tmdb';
import { formatRating, extractYear } from '../../utils/helpers';
import './SearchResultsPage.css';

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Read the URL — e.g. /search?q=iron+man
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';

  // Fetch results whenever the query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    searchMovies(query).then((data) => {
      setResults(data.results || []);
      setLoading(false);
    }).catch(() => {
      setResults([]);
      setLoading(false);
    });

  }, [query]);

  return (
    <main className="search-results-page" id="search-results-page">
      <div className="container">

        {/* Header */}
        <div className="search-results-page__header">
          <h1 className="search-results-page__title">
            Results for <span>"{query}"</span>
          </h1>
          {!loading && (
            <p className="search-results-page__count">
              {results.length} {results.length === 1 ? 'movie' : 'movies'} found
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="search-results-loading">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-poster-big" />
                <div className="skeleton-text" style={{ width: '80%' }} />
                <div className="skeleton-text" style={{ width: '50%' }} />
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && results.length === 0 && (
          <div className="search-results-empty">
            <span className="material-icons-round">search_off</span>
            <p>No movies found for "{query}"</p>
          </div>
        )}

        {/* Results grid */}
        {!loading && results.length > 0 && (
          <div className="search-results-grid">
            {results.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="search-result-card"
              >
                {/* Poster */}
                <div className="search-result-card__poster">
                  {movie.poster_path ? (
                    <img
                      src={getImageUrl(movie.poster_path, 'w342')}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="search-result-card__placeholder">
                      <span className="material-icons-round">movie</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <span className="search-result-card__title">
                  {movie.title || movie.name}
                </span>

                {/* Year + Rating */}
                <div className="search-result-card__meta">
                  {extractYear(movie.release_date)}
                  {movie.vote_average > 0 && (
                    <>
                      &nbsp;·&nbsp;
                      <span className="material-icons-round star">star</span>
                      {formatRating(movie.vote_average)}
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default SearchResultsPage;

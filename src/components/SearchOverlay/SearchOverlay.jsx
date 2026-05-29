// ===== SearchOverlay Component =====
// Full-screen search overlay with live search results.
//
// Syllabus Concepts Used:
// - useState (Module-II): query, results, loading states
// - useEffect (Module-V): debounced search, keyboard listeners, body scroll lock
// - Dependency Array (Module-V): effects re-run when dependencies change
// - Effect Cleanup (Module-V): removing listeners, clearing timeouts
// - fetch() API calls (Module-VI): via searchMovies
// - Controlled Components (Module-VI): search input
// - Conditional Rendering (Module-II): ternary, &&
// - Lists & Keys (Module-I): rendering results and genres
// - Event Handling (Module-VI): onChange, onClick

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchMovies, getImageUrl } from '../../api/tmdb';

import { formatRating } from '../../utils/helpers';
import './SearchOverlay.css';

function SearchOverlay({ isOpen, onClose }) {
  // --- State (Module-II) ---
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // When user presses Enter, go to search results page and close overlay
  function handleKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  }

  // --- useEffect #1: Reset on open/close ---
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // --- useEffect #2: Debounced search ---
  // When the user types, we wait 400ms before making the API call.
  // This prevents making too many API requests while typing.
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Set a timeout to delay the API call (debounce)
    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        setResults(data.results?.slice(0, 8) || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    // Cleanup: clear the timeout if query changes before 400ms
    return () => clearTimeout(timer);
  }, [query]);

  // --- useEffect #3: Close on Escape key ---
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // --- useEffect #4: Lock body scroll when overlay is open ---
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div className="search-overlay" id="search-overlay">
      {/* Backdrop — clicking closes the overlay */}
      <div className="search-overlay__backdrop" onClick={onClose} />

      <div className="search-overlay__content">
        {/* Search input — controlled component (Module-VI) */}
        <div className="search-overlay__input-wrap">
          <span className="material-icons-round search-overlay__input-icon">search</span>
          <input
            type="text"
            className="search-overlay__input"
            placeholder="Search movies, shows, actors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            id="search-input"
          />
          <button className="search-overlay__close-btn btn-ghost" onClick={onClose}>
            <span className="material-icons-round">close</span>
          </button>
        </div>

        {/* Search body — conditional rendering (Module-II) */}
        <div className="search-overlay__body">
          {query.trim() ? (
            // Show search results
            <div className="search-overlay__results">
              {loading ? (
                // Loading skeleton state
                <div className="search-overlay__loading">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="search-result-skeleton">
                      <div className="skeleton-poster" />
                      <div className="skeleton-info">
                        <div className="skeleton-line skeleton-line--title" />
                        <div className="skeleton-line skeleton-line--sub" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                // Results found
                <>
                  <h3 className="search-overlay__section-title">Results</h3>
                  {results.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="search-result" onClick={onClose}>
                      <div className="search-result__poster">
                        {movie.poster_path ? (
                          <img src={getImageUrl(movie.poster_path, 'w92')} alt="" />
                        ) : (
                          <div className="search-result__poster-placeholder">
                            <span className="material-icons-round">movie</span>
                          </div>
                        )}
                      </div>
                      <div className="search-result__info">
                        <span className="search-result__title">{movie.title || movie.name}</span>
                        <span className="search-result__meta">
                          {(movie.release_date || '').split('-')[0]}
                          {movie.vote_average > 0 && (
                            <> · <span className="material-icons-round star" style={{ fontSize: '14px' }}>star</span>{formatRating(movie.vote_average)}</>
                          )}
                        </span>
                      </div>
                      <span className="material-icons-round search-result__arrow">arrow_forward</span>
                    </Link>
                  ))}
                </>
              ) : (
                // No results found — empty state
                <div className="search-overlay__empty">
                  <span className="material-icons-round">search_off</span>
                  <p>No results found for &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;

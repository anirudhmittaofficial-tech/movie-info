

import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getSimilarMovies, getBackdropUrl, getImageUrl } from '../../api/tmdb';
import { formatRating, formatRuntime, formatCurrency, extractYear } from '../../utils/helpers';
import MovieCard from '../../components/MovieCard/MovieCard';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import WatchlistContext from '../../context/WatchlistContext';
import './MovieDetailPage.css';

// Small helper component for images with fallback (used for cast photos)
function ImageWithFallback({ src, alt, fallbackIcon, className, placeholderClassName }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'

  return (
    <>
      {src && status !== 'error' && (
        <img
          src={src}
          alt={alt}
          className={className}
          style={status === 'loading' ? { opacity: 0, position: 'absolute' } : undefined}
          onLoad={(e) => {
            if (e.target.naturalWidth > 1) {
              setStatus('loaded');
            } else {
              setStatus('error');
            }
          }}
          onError={() => setStatus('error')}
        />
      )}
      {(!src || status !== 'loaded') && (
        <div className={placeholderClassName}>
          <span className="material-icons-round">{fallbackIcon}</span>
        </div>
      )}
    </>
  );
}

function MovieDetailPage() {
  
  // Extract the movie ID from the URL path parameter (e.g., /movie/12345)
  const { id } = useParams();


  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posterStatus, setPosterStatus] = useState('loading');
  const [backdropStatus, setBackdropStatus] = useState('loading');

 
  const { toggleWatchlist, isInWatchlist } = useContext(WatchlistContext);

 
  // Dependency: [id] — re-fetches when navigating to a different movie.
  useEffect(() => {
    // Scroll to top when navigating to a new movie
    window.scrollTo(0, 0);

    // Reset image states when movie changes
    setPosterStatus('loading');
    setBackdropStatus('loading');

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch movie details, credits, and similar movies in parallel
        const [movieData, creditsData, similarData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getSimilarMovies(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
        setSimilar(similarData.results?.slice(0, 6) || []);
      } catch (err) {
        console.error('Failed to fetch movie:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --- Loading View (Module-VIII) ---
  if (loading) {
    return (
      <main className="detail-page">
        <SpinnerLoader message="Loading movie details..." />
      </main>
    );
  }

  // --- Error View (Module-VIII) ---
  if (error || !movie) {
    return (
      <main className="detail-page">
        <div className="detail-page__error container">
          <span className="material-icons-round">error_outline</span>
          <h2>Movie Not Found</h2>
          <p>{error || 'Could not load this movie.'}</p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </main>
    );
  }

  // --- Success View (Module-VIII) ---
  // Derive display values using helper functions
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const director = credits?.crew?.find((c) => c.job === 'Director');
  const writers = credits?.crew?.filter((c) => c.department === 'Writing').slice(0, 3) || [];
  const cast = credits?.cast?.slice(0, 12) || [];
  const rating = formatRating(movie.vote_average);
  const runtime = formatRuntime(movie.runtime);
  const year = extractYear(movie.release_date);
  const inWatchlist = isInWatchlist(movie.id);

  const showPosterPlaceholder = !posterUrl || posterStatus !== 'loaded';

  return (
    <main className="detail-page" id="movie-detail-page">
      {/* Backdrop */}
      <div className="detail-page__backdrop">
        {backdropUrl && backdropStatus !== 'error' && (
          <img
            src={backdropUrl}
            alt=""
            className="detail-page__backdrop-img"
            onLoad={(e) => {
              if (e.target.naturalWidth > 1) {
                setBackdropStatus('loaded');
              } else {
                setBackdropStatus('error');
              }
            }}
            onError={() => setBackdropStatus('error')}
          />
        )}
        <div className="detail-page__backdrop-gradient" />
      </div>

      {/* Hero Content — poster + info */}
      <section className="detail-page__hero container">
        <div className="detail-page__poster-wrap">
          {posterUrl && posterStatus !== 'error' && (
            <img
              src={posterUrl}
              alt={movie.title}
              className="detail-page__poster"
              style={posterStatus === 'loading' ? { opacity: 0 } : undefined}
              onLoad={(e) => {
                if (e.target.naturalWidth > 1) {
                  setPosterStatus('loaded');
                } else {
                  setPosterStatus('error');
                }
              }}
              onError={() => setPosterStatus('error')}
            />
          )}
          {showPosterPlaceholder && (
            <div className="detail-page__poster-placeholder">
              <span className="material-icons-round">movie</span>
            </div>
          )}
        </div>

        <div className="detail-page__info">
          <h1 className="detail-page__title">{movie.title}</h1>

          {/* Movie metadata */}
          <div className="detail-page__meta">
            {year && <span className="chip">{year}</span>}
            {runtime && <span className="chip">{runtime}</span>}
            <span className="rating-badge">
              <span className="material-icons-round star">star</span>
              {rating}
            </span>
            {movie.vote_count > 0 && (
              <span className="detail-page__vote-count">({movie.vote_count.toLocaleString()} votes)</span>
            )}
          </div>

          {/* Genres — rendered from list */}
          <div className="detail-page__genres">
            {movie.genres?.map((g) => (
              <span key={g.id} className="chip">{g.name}</span>
            ))}
          </div>

          {/* Overview */}
          <p className="detail-page__overview">{movie.overview}</p>

          {/* Director & Writers */}
          <div className="detail-page__crew">
            {director && (
              <div className="detail-page__crew-item">
                <span className="detail-page__crew-label">Director</span>
                <span className="detail-page__crew-name">{director.name}</span>
              </div>
            )}
            {writers.length > 0 && (
              <div className="detail-page__crew-item">
                <span className="detail-page__crew-label">Writers</span>
                <span className="detail-page__crew-name">{writers.map((w) => w.name).join(', ')}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="detail-page__actions">
            <button className="btn btn-primary" onClick={() => toggleWatchlist(movie)}>
              <span className="material-icons-round">{inWatchlist ? 'bookmark' : 'bookmark_border'}</span>
              {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
            <button className="btn btn-secondary">
              <span className="material-icons-round">share</span>
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      {cast.length > 0 && (
        <section className="detail-page__cast container">
          <h2 className="detail-page__section-title">
            <span className="detail-page__section-accent" />
            Top Cast
          </h2>
          <div className="detail-page__cast-grid">
            {cast.map((person) => (
              <div key={person.id} className="cast-card" id={`cast-${person.id}`}>
                <div className="cast-card__photo">
                  <ImageWithFallback
                    src={person.profile_path ? getImageUrl(person.profile_path, 'w185') : null}
                    alt={person.name}
                    fallbackIcon="person"
                    placeholderClassName="cast-card__photo-placeholder"
                  />
                </div>
                <div className="cast-card__info">
                  <span className="cast-card__name">{person.name}</span>
                  <span className="cast-card__character">{person.character}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Movie Details Grid */}
      <section className="detail-page__details container">
        <h2 className="detail-page__section-title">
          <span className="detail-page__section-accent" />
          Details
        </h2>
        <div className="detail-page__details-grid">
          {movie.status && (
            <div className="detail-info-item">
              <span className="detail-info-item__label">Status</span>
              <span className="detail-info-item__value">{movie.status}</span>
            </div>
          )}
          {movie.original_language && (
            <div className="detail-info-item">
              <span className="detail-info-item__label">Language</span>
              <span className="detail-info-item__value">{movie.original_language.toUpperCase()}</span>
            </div>
          )}
          {movie.budget > 0 && (
            <div className="detail-info-item">
              <span className="detail-info-item__label">Budget</span>
              <span className="detail-info-item__value">{formatCurrency(movie.budget)}</span>
            </div>
          )}
          {movie.revenue > 0 && (
            <div className="detail-info-item">
              <span className="detail-info-item__label">Revenue</span>
              <span className="detail-info-item__value">{formatCurrency(movie.revenue)}</span>
            </div>
          )}
        </div>
      </section>

      {/* Similar Movies */}
      {similar.length > 0 && (
        <section className="detail-page__similar container">
          <h2 className="detail-page__section-title">
            <span className="detail-page__section-accent" />
            More Like This
          </h2>
          <div className="detail-page__similar-grid">
            {similar.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                onWatchlistToggle={toggleWatchlist}
                isInWatchlist={isInWatchlist(m.id)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default MovieDetailPage;


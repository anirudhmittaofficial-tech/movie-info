

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getTrending, getNowPlaying, getTopRated, getUpcoming } from '../../api/tmdb';
import HeroSection from '../../components/HeroSection/HeroSection';
import MovieCard from '../../components/MovieCard/MovieCard';
import { SkeletonHero, SkeletonRow } from '../../components/SkeletonLoader/SkeletonLoader';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import WatchlistContext from '../../context/WatchlistContext';
import './HomePage.css';

// Displays a horizontal row of movie cards with a title.
// Props:
//   title (string) — section heading
//   movies (array) — list of movie objects
function MovieRow({ title, movies }) {
  // Access watchlist from context (no prop drilling!)
  const { toggleWatchlist, isInWatchlist } = useContext(WatchlistContext);

  return (
    <section className="movie-row">
      <div className="movie-row__header container">
        <h2 className="movie-row__title">
          <span className="movie-row__title-accent" />
          {title}
        </h2>
        <Link to="/" className="movie-row__more">
          Explore More
          <span className="material-icons-round">chevron_right</span>
        </Link>
      </div>
      <div className="movie-row__scroll container">
        <div className="movie-row__grid">
          {/* Rendering a list of MovieCards using map (Module-I) */}
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchlistToggle={toggleWatchlist}
              isInWatchlist={isInWatchlist(movie.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== HomePage Component =====
function HomePage() {

  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const { toggleWatchlist, isInWatchlist } = useContext(WatchlistContext);


  // Empty dependency array [] means this runs ONCE when component mounts.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories in parallel; allSettled never rejects
        const [trendRes, npRes, trRes, upRes] = await Promise.allSettled([
          getTrending(),
          getNowPlaying(),
          getTopRated(),
          getUpcoming(),
        ]);

        // Extract results safely — use empty array if a request failed
        const trending  = trendRes.status === 'fulfilled' ? (trendRes.value.results  || []) : [];
        const nowPlay   = npRes.status   === 'fulfilled' ? (npRes.value.results    || []) : [];
        const topR      = trRes.status   === 'fulfilled' ? (trRes.value.results    || []) : [];
        const upcoming  = upRes.status   === 'fulfilled' ? (upRes.value.results    || []) : [];

        // Log any individual failures for debugging
        [trendRes, npRes, trRes, upRes].forEach((r, i) => {
          if (r.status === 'rejected') {
            console.error(`TMDB request #${i} failed:`, r.reason);
          }
        });

        // Only show error if ALL requests failed
        if (!trending.length && !nowPlay.length && !topR.length && !upcoming.length) {
          setError('Failed to load movies. Please check your API key or internet connection.');
        } else {
          setTrending(trending);
          setNowPlaying(nowPlay);
          setTopRated(topR);
          setUpcoming(upcoming);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Loading View (Module-VIII) ---
  if (loading) {
    return (
      <main className="home-page">
        <SkeletonHero />
        <div className="container">
          <SkeletonRow count={6} title="Loading..." />
          <SkeletonRow count={6} />
        </div>
      </main>
    );
  }

  // --- Error View (Module-VIII) ---
  if (error) {
    return (
      <main className="home-page">
        <div className="home-page__error container">
          <span className="material-icons-round">error_outline</span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  
  const heroMovie = trending[0];

  return (
    <main className="home-page" id="home-page">
      {/* Hero Banner — first trending movie */}
      <HeroSection
        movie={heroMovie}
        onWatchlistToggle={toggleWatchlist}
        isInWatchlist={isInWatchlist(heroMovie?.id)}
      />

      {/* Movie Sections — each uses logical && for conditional rendering */}
      <div className="home-page__sections">
        {trending.length > 0 && (
          <MovieRow title="Trending Movies" movies={trending.slice(1, 13)} />
        )}
        {nowPlaying.length > 0 && (
          <MovieRow title="Now Playing" movies={nowPlaying.slice(0, 12)} />
        )}
        {topRated.length > 0 && (
          <MovieRow title="Top Rated" movies={topRated.slice(0, 12)} />
        )}
        {upcoming.length > 0 && (
          <MovieRow title="Coming Soon" movies={upcoming.slice(0, 12)} />
        )}
      </div>
    </main>
  );
}

export default HomePage;

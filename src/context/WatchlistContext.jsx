

import { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { STORAGE_KEYS } from '../utils/constants';


const WatchlistContext = createContext(null);


function getStoredWatchlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// --- Step 2: Create the Provider ---
function WatchlistProvider({ children }) {
  // Initialize state from localStorage (list as state — Module-II)
  const [watchlist, setWatchlist] = useState(getStoredWatchlist);

  // --- useEffect: Sync watchlist to localStorage whenever it changes ---
  // Dependency array: [watchlist] — runs every time watchlist updates.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
  }, [watchlist]);

  
  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      // Check if movie is already in watchlist (prevent duplicates)
      if (prev.some((m) => m.id === movie.id)) return prev;

      // Create a new array with the new movie added (immutable update)
      return [...prev, {
        id: movie.id,
        watchlistId: uuidv4(), // Unique ID using UUID package
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date || movie.first_air_date,
        overview: movie.overview,
        genre_ids: movie.genre_ids || [],
        media_type: movie.media_type || 'movie',
        addedAt: Date.now(),
      }];
    });
  };

  // --- Remove a movie from the watchlist ---
  // Uses filter() for ----
  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  // --- Check if a movie is in the watchlist ---
  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  // --- Toggle (add or remove) a movie from the watchlist ---
  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  // --- Context Value ---
  const value = {
    watchlist,
    watchlistCount: watchlist.length,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

// Export the context and provider
export { WatchlistContext, WatchlistProvider };
export default WatchlistContext;

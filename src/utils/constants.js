// ===== Constants =====
// Central file for all constant values used across the application.
// Keeping constants here means you only need to change them in one place.

// --- TMDB API Configuration ---
export const TMDB_API_KEY = 'ae8482a3d7eec8400e05671581751d23';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p';

// --- Auth API Configuration ---
export const AUTH_API_BASE = 'https://login-and-registration-58by.onrender.com/api/v1/user';

// --- localStorage Key Names ---

export const STORAGE_KEYS = {
  TOKEN: 'movie_token',     // JWT token from the real backend
  USER: 'movie_user',      // Logged-in user object
  WATCHLIST: 'movieinfo_watchlist', // Saved watchlist array
};

// --- Navigation Links ---
// Used in Navbar and MobileSidebar to render links from data
export const NAV_LINKS = [
  { to: '/', label: 'Movies' },
  { to: '/?section=tvshows', label: 'TV Shows' },
  { to: '/?section=celebs', label: 'Celebs' },
  { to: '/watchlist', label: 'Watchlist' },
];

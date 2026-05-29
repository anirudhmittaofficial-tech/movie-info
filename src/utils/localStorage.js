



export const KEYS = {
  TOKEN:     'movie_token',    // JWT token from the backend
  USER:      'movie_user',     // Logged-in user object
  WATCHLIST: 'movie_watchlist', // User's saved watchlist
};


// Save any value to localStorage (converts to JSON string)
export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Read a value from localStorage (parses JSON back to object/array)
// Returns `fallback` if the key doesn't exist or data is corrupted
export function getFromStorage(key, fallback = null) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

// Remove a single key from localStorage
export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

// -----------------------------------------------
// Auth token helpers (used by AuthContext.jsx)
// -----------------------------------------------

// Save the JWT token received from the backend
export function saveToken(token) {
  localStorage.setItem(KEYS.TOKEN, token);
}

// Get the stored JWT token
export function getToken() {
  return localStorage.getItem(KEYS.TOKEN);
}

// Remove the JWT token (on logout)
export function removeToken() {
  localStorage.removeItem(KEYS.TOKEN);
}

// -----------------------------------------------
// User object helpers (used by AuthContext.jsx)
// -----------------------------------------------

// Save the user object (name, email, etc.) from the backend response
export function saveUser(user) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

// Get the stored user object
export function getUser() {
  return getFromStorage(KEYS.USER, null);
}

// Remove the stored user object (on logout)
export function removeUser() {
  localStorage.removeItem(KEYS.USER);
}

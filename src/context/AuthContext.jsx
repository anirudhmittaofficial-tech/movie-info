

import { createContext, useState, useEffect } from 'react';
import { AUTH_API_BASE, STORAGE_KEYS } from '../utils/constants';


const AuthContext = createContext(null);


function AuthProvider({ children }) {

  const [user, setUser]       = useState(null);   // logged-in user object
  const [token, setToken]     = useState(null);   // JWT token from backend
  const [loading, setLoading] = useState(false);  // true while API call is running
  const [error, setError]     = useState('');     // error message to show in forms

  
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedUser  = localStorage.getItem(STORAGE_KEYS.USER);

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // -----------------------------------------------
  // LOGIN — POST /login
  // -----------------------------------------------
  async function login(username, email, password) {
    setError('');
    setLoading(true);

    const response = await fetch(`${AUTH_API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message || 'Login failed. Please check your details.');
      return false;
    }

    // Save token + user from the backend response
    const receivedToken = data.token || data.accessToken || '';
    const loggedInUser  = data.user  || { username, email };

    setToken(receivedToken);
    setUser(loggedInUser);
    localStorage.setItem(STORAGE_KEYS.TOKEN, receivedToken);
    localStorage.setItem(STORAGE_KEYS.USER,  JSON.stringify(loggedInUser));

    return true;
  }

  // -----------------------------------------------
  // REGISTER — POST /register
  // -----------------------------------------------
  async function register(username, email, password) {
    setError('');
    setLoading(true);

    const response = await fetch(`${AUTH_API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message || 'Registration failed. Please try again.');
      return false;
    }

    return true; // caller (SignUpPage) will redirect to /signin
  }

  // -----------------------------------------------
  // LOGOUT — clear everything
  // -----------------------------------------------
  function logout() {
    setToken(null);
    setUser(null);
    setError('');
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  // -----------------------------------------------
  // Context value shared with all components
  // -----------------------------------------------
  const value = {
    user,
    token,
    loading,
    error,
    isLoggedIn: token !== null,     // true when user is authenticated
    login,
    register,
    logout,
    clearError: () => setError(''),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
export default AuthContext;

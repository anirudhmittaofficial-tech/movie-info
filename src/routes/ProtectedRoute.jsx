
// If user is NOT logged in, redirect them to /signin.
// If user IS logged in, show the page normally.
//
// Concepts Used:
// - useContext (read auth state)
// - Conditional Rendering (show page or redirect)

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  // Not logged in → go to sign in page
  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  // Logged in → show the page
  return children;
}

export default ProtectedRoute;

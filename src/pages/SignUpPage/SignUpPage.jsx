
// Register page — sends username, email, password to the API.
// On success, shows a success message and goes to sign in page.
//
// Concepts Used:
// - useState (form fields, success flag)
// - useContext (get register function and error from AuthContext)
// - Event Handling (onChange, onSubmit)
// - Conditional Rendering (show error or success message)

import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../SignInPage/SignInPage.css'; // reuse the same styles

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const { register, loading, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();
    setSuccess(false);

    const ok = await register(username, email, password);
    if (ok) {
      setSuccess(true);
      // Wait 1.5 seconds then go to sign in page
      setTimeout(() => navigate('/signin'), 1500);
    }
  }

  return (
    <main className="auth-page" id="signup-page">
      <div className="auth-card">

        {/* Logo */}
        <Link to="/" className="auth-card__logo">
          <span className="auth-card__logo-icon">🎬</span>
          <span className="auth-card__logo-text">
            MOVIE <span className="auth-card__logo-accent">Info</span>
          </span>
        </Link>

        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join and start building your watchlist.</p>

        {/* Show error if registration failed */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* Show success message */}
        {success && (
          <div className="auth-success">
            Account created! Redirecting to sign in...
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="signup-username" className="auth-field__label">Username</label>
            <input
              id="signup-username"
              type="text"
              className="auth-field__input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email" className="auth-field__label">Email</label>
            <input
              id="signup-email"
              type="email"
              className="auth-field__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password" className="auth-field__label">Password</label>
            <input
              id="signup-password"
              type="password"
              className="auth-field__input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            id="signup-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>

      </div>
    </main>
  );
}

export default SignUpPage;

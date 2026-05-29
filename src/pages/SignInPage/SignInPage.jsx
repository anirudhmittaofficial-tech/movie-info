

import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './SignInPage.css';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();

    const success = await login(username, email, password);
    if (success) {
      navigate('/'); // go to home page after login
    }
  }

  return (
    <main className="auth-page" id="signin-page">
      <div className="auth-card">

        {/* Logo */}
        <Link to="/" className="auth-card__logo">
          <span className="auth-card__logo-icon">🎬</span>
          <span className="auth-card__logo-text">
            MOVIE <span className="auth-card__logo-accent">Info</span>
          </span>
        </Link>

        <h1 className="auth-card__title">Sign In</h1>
        <p className="auth-card__subtitle">Welcome back! Sign in to your account.</p>

        {/* Show error if login failed */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="signin-username" className="auth-field__label">Username</label>
            <input
              id="signin-username"
              type="text"
              className="auth-field__input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signin-email" className="auth-field__label">Email</label>
            <input
              id="signin-email"
              type="email"
              className="auth-field__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signin-password" className="auth-field__label">Password</label>
            <input
              id="signin-password"
              type="password"
              className="auth-field__input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            id="signin-submit-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

      </div>
    </main>
  );
}

export default SignInPage;

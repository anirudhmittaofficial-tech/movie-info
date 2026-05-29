// ===== NotFoundPage =====
// Shown when user navigates to a route that doesn't exist.

import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <main className="notfound-page" id="notfound-page">
      <div className="notfound-page__content">
        <span className="notfound-page__code">404</span>
        <h1 className="notfound-page__title">Page Not Found</h1>
        <p className="notfound-page__text">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          <span className="material-icons-round">home</span>
          Go Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;

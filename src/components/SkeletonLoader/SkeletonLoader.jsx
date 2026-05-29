

import './SkeletonLoader.css';

// Individual skeleton card (mimics a MovieCard shape)
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__poster" />
      <div className="skeleton-card__info">
        <div className="skeleton-card__rating" />
        <div className="skeleton-card__title" />
        <div className="skeleton-card__year" />
      </div>
    </div>
  );
}

// Skeleton row — a title placeholder + grid of skeleton cards
// Props:
//   count (number) — how many skeleton cards to show
//   title (string) — if provided, shows a title placeholder
function SkeletonRow({ count = 6, title = '' }) {
  return (
    <div className="skeleton-row">
      {title && <div className="skeleton-row__title" />}
      <div className="skeleton-row__grid">
        {/* Creating an array of 'count' items and mapping over it */}
        {[...Array(count)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// Skeleton hero — mimics the HeroSection layout
function SkeletonHero() {
  return (
    <div className="skeleton-hero">
      <div className="skeleton-hero__content">
        <div className="skeleton-hero__chip" />
        <div className="skeleton-hero__title" />
        <div className="skeleton-hero__text" />
        <div className="skeleton-hero__text skeleton-hero__text--short" />
        <div className="skeleton-hero__actions">
          <div className="skeleton-hero__btn" />
          <div className="skeleton-hero__btn skeleton-hero__btn--secondary" />
        </div>
      </div>
    </div>
  );
}

// Export all skeleton components for use in different pages
export { SkeletonCard, SkeletonRow, SkeletonHero };

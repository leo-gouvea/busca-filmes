// Skeletons.jsx
export function SkeletonCard() {
  return (
    <div className="movie-card">
      <div className="skeleton skeleton-poster" />
      <div className="skeleton skeleton-line skeleton-title" />
      <div className="skeleton skeleton-line skeleton-small" />
      <div className="skeleton skeleton-btn" />
    </div>
  );
}

export function SkeletonGrid({ count = 10 }) {
  return (
    <div className="movies-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="details-skeleton">
      <div className="skeleton skeleton-back" />
      <div className="skeleton skeleton-heading" />
      <div className="details-skeleton-body">
        <div className="skeleton skeleton-poster-large" />
        <div className="details-skeleton-text">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
        </div>
      </div>
      <div className="skeleton skeleton-btn-wide" />
    </div>
  );
}

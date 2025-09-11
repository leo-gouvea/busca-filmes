// Skeletons.jsx
export function SkeletonCard() {
  return (
    <div className="movie-card">
      <div className="poster skeleton skeleton-poster" />
      <div className="card-info">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line skeleton-small" />
      </div>
      <div className="fav-btn">
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}





export function SkeletonGrid({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
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

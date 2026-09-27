import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="gutter">
    <div className="frame flex min-h-screen flex-col justify-center py-24">
      <p className="section-label max-w-md">
        <span className="section-num">404</span>
        <span>Not found</span>
      </p>
      <h1 className="display">
        Nothing <em>here.</em>
      </h1>
      <p className="intro-text muted mt-8">This page doesn't exist, or it moved when the site was rebuilt.</p>
      <p className="mt-6">
        <Link to="/" className="ed-action">
          <span aria-hidden="true">←</span>
          <span className="ed-action-label">Back to the homepage</span>
        </Link>
      </p>
    </div>
  </main>
);

export default NotFound;

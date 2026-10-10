import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <h1 className="page-title">Page Not Found</h1>
        <p className="page-intro">The page you are looking for does not exist.</p>
        <Link to="/" className="btn primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;

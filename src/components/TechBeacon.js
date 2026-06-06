import React from 'react';
import { Link } from 'react-router-dom';
import { FaMicrochip } from 'react-icons/fa';

const TechBeacon = () => {
  return (
    <Link
      to="/about#tech-stack"
      className="tech-beacon"
      aria-label="Explore my tech stack"
    >
      <span className="tech-beacon-ring" aria-hidden="true" />
      <span className="tech-beacon-core" aria-hidden="true">
        <FaMicrochip />
      </span>
      <span className="tech-beacon-label">My Tech Stack</span>
    </Link>
  );
};

export default TechBeacon;

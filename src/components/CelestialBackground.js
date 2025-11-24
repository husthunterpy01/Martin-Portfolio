import React from 'react';

const CelestialBackground = () => {
  return (
    <div className="celestial-background">
      <div className="celestial sun"></div>
      <div className="celestial sun-glow"></div>

      <div className="celestial moon">
        <span className="crater crater-1"></span>
        <span className="crater crater-2"></span>
        <span className="crater crater-3"></span>
      </div>
      <div className="celestial moon-glow"></div>
    </div>
  );
};

export default CelestialBackground;


import React from 'react';

function HUD() {
  return (
    <div className="flex justify-center">
      <div className="absolute p-4 z-10 flex">
        <h2 className="text-3xl font-bold text-custom-green">Green</h2>
        <h2 className="text-3xl font-bold text-custom">Map</h2>
      </div>
    </div>
  );
};

export default HUD;
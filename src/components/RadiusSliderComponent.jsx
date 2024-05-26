import React, { useState } from 'react';

const RadiusFilterSliderComponent = ({ lat, lng }) => {
    const [radius, setRadius] = useState(0);

    const handleRadiusChange = (event) => {
        setRadius(event.target.value);
    };

    return (
        <div className="p-4">
            <h2 className='font-bold'>By Radius</h2>
            <input
                type="range"
                min="0"
                max="100"
                value={radius}
                onChange={handleRadiusChange}
            />
            <h3 className='font-semibold'>Radius: {radius} km</h3>
        </div>
    );
};

export default RadiusFilterSliderComponent;
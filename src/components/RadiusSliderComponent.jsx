import React from 'react';
import cities from '../js/cities';
import { useRadius } from './Context';
import { useState } from 'react';

const RadiusFilterSliderComponent = ({ lat, lng }) => {
    const { radius, setRadius } = useRadius();
    const [radiusSlider, setRadiusSlider] = useState(0);
    const [selectedCity, setSelectedCity] = useState('');

    const handleRadiusChange = (event) => {
        if (selectedCity === '') {
            alert('Please select a city');
            return;
        }
        let city = {...cities[selectedCity]};
        city.radius = radiusSlider;
        setRadius(city);
    }

    const handleRadiusSliderChange = (event) => {
        setRadiusSlider(event.target.value);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    }


    return (
        <div className="p-4 flex flex-col">
            <select value={selectedCity} onChange={handleCityChange} className='mb-3' required>
                <option value="">Cities</option>
                {cities.map((city, index) => (
                    <option key={index} value={index}>
                        {city.name}
                    </option>
                ))}
            </select>
            <h2 className='font-bold mb-3'>By Radius</h2>
            <input
                type="range"
                min="0"
                max="200"
                value={radiusSlider}
                onChange={handleRadiusSliderChange}
                className='slider'
            />
            <h3 className='font-semibold'>Radius: {radiusSlider} km</h3>
            <button onClick={handleRadiusChange} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3'>
                Apply
            </button>
        </div>
    );
};

export default RadiusFilterSliderComponent;
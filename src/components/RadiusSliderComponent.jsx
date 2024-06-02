import React, { useEffect } from 'react';
import cities from '../js/cities';
import { useRadius } from './Context';
import { useState } from 'react';

const RadiusFilterSliderComponent = ({ selectedCity, setSelectedCity, radiusSlider, setRadiusSlider }) => {
    const { radius, setRadius } = useRadius();

    const handleRadiusChange = (event) => {
        if (selectedCity === '') {
            alert('Please select a city');
            return;
        }
        let city = {...cities[selectedCity]};
        city.radius = radiusSlider;
        city.key = selectedCity;
        setRadius(city);
    }

    const handleRadiusSliderChange = (event) => {
        setRadiusSlider(event.target.value);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    }

    useEffect(() => {
        if (radius.key != undefined) {
            setSelectedCity(radius.key);
            setRadiusSlider(radius.radius);
        }
    }, []);

    return (
        <div className="p-4 flex flex-col border rounded-xl">
            <h2 className='font-bold mb-3'>By Radius</h2>
            <select value={radius.key != undefined ? radius.key : selectedCity} onChange={handleCityChange} className='mb-3' required>
                <option value="">Select city</option>
                {cities.map((city, index) => (
                    <option key={index} value={index}>
                        {city.name}
                    </option>
                ))}
            </select>
            
            <input
                type="range"
                min="0"
                max="200"
                value={radiusSlider}
                onChange={handleRadiusSliderChange}
                className='slider'
            />
            <h3 className='font-semibold mt-2 mb-2'>Radius: {radiusSlider} km</h3>
            <button onClick={handleRadiusChange} className='bg-custom-green hover:bg-custom-green-hover text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline'>
                Apply
            </button>
        </div>
    );
};

export default RadiusFilterSliderComponent;
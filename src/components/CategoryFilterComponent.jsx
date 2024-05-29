import React, { useState, useEffect } from 'react';
import instance from '../js/connection';

const CategoryFilterComponent = ({ lat, lng }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        instance.get('/category/getAllCategories').then((response) => {
            console.log('Response:', response.data.Categories);
            setCategories(response.data.Categories);
        });
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className='p-4 flex flex-col justify-start items-start'>
            <h2 className='font-bold mb-3'>By Category</h2>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Categories</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilterComponent;
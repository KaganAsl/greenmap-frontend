import React, { useState, useEffect } from 'react';
import instance from '../js/connection';
import { useCategory } from './Context';

const CategoryFilterComponent = ({ lat, lng }) => {
    const [categories, setCategories] = useState([]);
    const { category, setCategory } = useCategory();

    useEffect(() => {
        instance.get('/category/getAllCategories').then((response) => {
            setCategories(response.data.Categories);
        });
    }, []);

    const handleCategoryChange = (event) => {
        if (event.target.value === ''){
            setCategory(0);
        } else {
            setCategory(event.target.value);
        }
    };

    return (
        <div className='p-4 flex flex-col mb-5'>
            <h2 className='font-bold mb-3'>By Category</h2>
            <select value={category} onChange={handleCategoryChange}>
                <option value="">Select category</option>
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
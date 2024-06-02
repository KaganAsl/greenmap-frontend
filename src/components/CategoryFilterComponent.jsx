import React, { useState, useEffect } from 'react';
import instance from '../js/connection';
import { useCategory } from './Context';

const CategoryFilterComponent = ({ lat, lng }) => {
    const [categories, setCategories] = useState([]);
    const { category, setCategory } = useCategory();
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        instance.get('/category/getAllCategories').then((response) => {
            setCategories(response.data.Categories);
        });
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const applyFilter = () => {
        if (selectedCategory === '') {
            setCategory(0);
        } else {
            setCategory(selectedCategory);
        }
    };

    return (
        <div className='p-4 flex flex-col mt-5 border rounded-xl'>
            <h2 className='font-bold mb-3'>By Category</h2>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.type}
                    </option>
                ))}
            </select>
            <button 
                onClick={applyFilter} 
                className='bg-custom-green hover:bg-custom-green-hover text-white font-bold py-2 px-10 mt-4 rounded focus:outline-none focus:shadow-outline'
            >
                Apply
            </button>
        </div>
    );
};

export default CategoryFilterComponent;

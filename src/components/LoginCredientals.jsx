import React from 'react';
import { useState, useEffect } from 'react';
import { useLoggedIn } from './Context';
import instance from '../js/connection';

const LoginCredentials = () => {
    const { loggedIn, setLoggedIn } = useLoggedIn();
    const [formData, setFormData] = useState({username: '', password: ''});
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    };

    const handleButtonClick = () => {
        instance.post('/login', formData).then((response) => {
            setLoggedIn(true);
        }).catch((error) => {
            setError(error.response.data);
        });
    }

    return (
        <div className='absolute inset-0 h-screen w-screen backdrop-blur-lg items-center justify-center rounded-r-xl flex z-10'>
            <form className='bg-white shadow-md rounded px-12 pt-8 pb-10 mb-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='username'
                        type='text'
                        placeholder='Enter your username'
                        onChange={handleInputChange}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        className='bg-custom-green hover:bg-custom-green-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='button'
                        onClick={handleButtonClick}
                    >
                        Login
                    </button>
                </div>
                {error ? (
                <div className='flex mt-4 items-center justify-center'>
                    <p>{error}</p>
                </div>
                ) : null}
            </form>
        </div>
    );
};

export default LoginCredentials;
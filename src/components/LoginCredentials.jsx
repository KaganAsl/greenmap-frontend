import React from 'react';
import { useState, useEffect } from 'react';
import { useLoggedIn } from './Context';
import instance from '../js/connection';
import SignUpCredentials from './SignUpCredentials.jsx';

const LoginCredentials = () => {
    const { loggedIn, setLoggedIn } = useLoggedIn();
    const [formData, setFormData] = useState({username: '', password: ''});
    const [error, setError] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

    if (showSignup) {
        return <SignUpCredentials />;
    }

    const handleInputChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    };

    const handleButtonClick = () => {
        let valid = true;
        if (!formData.username) {
            setUsernameValid(false);
            valid = false;
        } else {
            setUsernameValid(true);
        }

        if (!formData.password) {
            setPasswordValid(false);
            valid = false;
        } else {
            setPasswordValid(true);
        }
        
        if (!valid) {
            setError('Please fill in the required fields')
            return;
        }
    
        instance.post('/login', formData).then((response) => {
            setLoggedIn(true);
        }).catch((error) => {
            setUsernameValid(false);
            setPasswordValid(false);
            valid = false;
            setError(error.response.data);
        });
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    

    return (
        <div className='absolute inset-0 h-screen w-screen backdrop-blur-lg items-center justify-center rounded-r-xl flex z-10'>
            <form className='bg-white shadow-md rounded px-12 pt-8 pb-10 mb-4'>
            <h2 className="mt-0 mb-5 text-center text-xl leading-9 tracking-tight text-gray-900">
            Welcome back!
          </h2>
          <div className='mb-4'>

    <div className={`flex items-center border rounded shadow appearance-none w-full ${!usernameValid ? 'border-2 border-red-500 shadow-[0_0_5px_rgba(255,0,0,0.5)]' : ''}`}>
        <i className='p-1'>
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
        </i>
     <input
            className='shadow appearance-none w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none'
            id='username'
            type='text'
            placeholder='Username'
            onChange={handleInputChange}
        />
    </div>
</div>
<div className='mb-4'>

    <div className={`flex items-center border rounded shadow appearance-none w-full ${!passwordValid ? 'border-2 border-red-500 shadow-[0_0_5px_rgba(255,0,0,0.5)]' : ''}`}>
    <i className='p-1'>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
    </i>
        <input
            className='shadow appearance-none w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none'
            id='password'
            type={passwordVisible ? 'text' : 'password'}
            placeholder='Password'
            onChange={handleInputChange}
        />
        <button type="button" className="mx-2" onClick={togglePasswordVisibility}>
            {passwordVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
            )}
        </button>
    </div>
</div>
<div className='flex items-center justify-center'>
    <button
        className='bg-custom-green hover:bg-custom-green-hover text-white font-semibold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline'
        type='button'
        onClick={handleButtonClick}
    >
        Login
    </button>
</div>

<p className="mt-5 text-center text-sm text-gray-500">
            Don't have an account yet?{' '}
            <button onClick={() => setShowSignup(true)} className="font-semibold leading-tight text-custom-green hover:text-green-800">
                    Sign Up
                </button>
          </p>

                {error ? (
                <div className='flex mt-4 items-center justify-center'>
                    <p className='text-red-400'>{error}</p>
                </div>
                ) : null}
            </form>
        </div>
    );
};

export default LoginCredentials;
import React, { useState } from 'react';
import { useLoggedIn } from './Context';
import instance from '../js/connection';
import LoginCredentials from './LoginCredentials';

const SignupCredentials = () => {
    const { setLoggedIn } = useLoggedIn();
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState(null);
	const [showLogin, setShowLogin] = useState(false);

    if (showLogin) {
        return <LoginCredentials />;
    }
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleButtonClick = () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        instance.post('/user/createUser', formData).then((response) => {
            instance.post('/login', {
                username: formData.username,
                password: formData.password
            }).then((response) => {
                setLoggedIn(true);
            }
            ).catch((error) => {
                setError(error.response.data);
            }
            );
        }).catch((error) => {
            setError(error.response.data);
        });
    }

    return (
        <div className='absolute inset-0 h-screen w-screen backdrop-blur-lg items-center justify-center rounded-r-xl flex z-10'>
        <form className='bg-white shadow-md rounded px-12 pt-8 pb-10 mb-4'>
        <h2 className="mt-0 mb-5 text-center text-xl leading-9 tracking-tight text-gray-900">
        Create Account
        </h2>
        <div className='mb-4'>
        <div className="flex items-center border rounded shadow appearance-none w-full">
        <i className='p-1'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
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
        <div className="flex items-center border rounded shadow appearance-none w-full">
		<i className='p-1'>
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>       </i>
        <input
        className='shadow appearance-none w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none'
        id='email'
        type='email'
        placeholder='Email'
        onChange={handleInputChange}
        />
        </div>
        </div>
        <div className='mb-4'>
        <div className="flex items-center border rounded shadow appearance-none w-full">
        <i className='p-1'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </i>
        <input
        className='shadow appearance-none w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none'
        id='password'
        type='password'
        placeholder='Password'
        onChange={handleInputChange}
        />
        </div>
        </div>
        <div className='mb-4'>
        <div className="flex items-center border rounded shadow appearance-none w-full">
		<i className='p-1'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </i>
        <input
        className='shadow appearance-none w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none'
        id='confirmPassword'
        type='password'
        placeholder='Confirm Password'
        onChange={handleInputChange}
        />
        </div>
        </div>
        <div className='flex items-center justify-center'>
        <button
        className='bg-custom-green hover:bg-custom-green-hover text-white font-semibold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline'
        type='button'
        onClick={handleButtonClick}
        >
        Sign Up
        </button>
        </div>

		<p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{' '}
			<button onClick={() => setShowLogin(true)} className="font-semibold leading-tight text-custom-green hover:text-green-800">
                    Login
                </button>
          </p>
        {error && (
            <div className='flex mt-4 items-center justify-center'>
            <p className="text-red-500">{error}</p>
            </div>
        )}
        </form>
        </div>
    );
};

export default SignupCredentials;

import React, { useState, useEffect } from 'react';
import instance from '../js/connection';
import Cookies from 'js-cookie';
import { useLoggedIn } from './Context';

const SettingsPageComponent = ({ setSettingsButton }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [showModal, setShowModal] = useState(false);  // State for modal visibility
    const [confirmPassword, setConfirmPassword] = useState('');  // State for confirm password
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const { loggedIn, setLoggedIn } = useLoggedIn();

    useEffect(() => {
        const token = Cookies.get('GreenMap_AUTH');
        const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
        const usernameToken = atob(base64).split('_')[0];
        instance.get("/user/getUserByUsername", {
            params: {
                username: usernameToken,
            }
        }).then((response) => {
            setUsername(response.data.username);
            setEmail(response.data.email);
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'username') {
            setUsername(value);
        } else if (id === 'email') {
            setEmail(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    };

    const handleClose = () => {
        setSettingsButton(false);
    };

    const handleUpdateAccount = () => {
        if (!password || !confirmPassword) {
            setError("Please fill in the required fields");
            setInfo("");
            if (!password && !confirmPassword) {
                setPasswordValid(false);
                setConfirmPasswordValid(false);
            } else if (!password) {
                setPasswordValid(false);
                setConfirmPasswordValid(true);
            } else if (!confirmPassword) {
                setConfirmPasswordValid(false);
                setPasswordValid(true);
            }
            return;
        } else if (password !== confirmPassword) {
            setError("Passwords do not match");
            setPasswordValid(false);
            setConfirmPasswordValid(false);
            setInfo("");
            return;
        }
        instance.post("/user/updateUser", {
            username: username,
            email: email,
            password: password,
        }).then(() => {
            setInfo("User data updated successfully");
            setError('');
            setPasswordValid(true);
            setConfirmPasswordValid(true);
            setPassword('');
            setConfirmPassword('');
            setPasswordVisible(false);
            setConfirmPasswordVisible(false);
        }).catch(() => {
            setError("Error updating user data");
            setInfo("");
        });
    };

    const handleDeleteAccount = () => {
        instance.post("/logout", null, {
            headers: {
                "Authorization": `${Cookies.get('GreenMap_AUTH')}`,
            },
        }).then(() => {
            instance.delete("/user/deleteUser", {
                data: {
                    username: username,
                }
            }).then(() => {
                setInfo("User data deleted successfully");
            }).catch((error) => {
                console.error("Error deleting user data:", error);
                setError("Error deleting user data");
            });
            Cookies.remove('GreenMap_AUTH');
            setSettingsButton(false);
            setLoggedIn(false);
        }).catch((error) => {
            console.error("Error logging out:", error);
        });
    };

    const handleShowModal = () => {
        setShowModal(true);
    };
    
    const handleConfirmDelete = () => {
        setShowModal(false);
        handleDeleteAccount();
    };
    
    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const ConfirmationModal = ({ onConfirm, onCancel }) => (
        <div className='fixed inset-0 flex items-center justify-center z-20'>
            <div className='absolute inset-0 bg-black opacity-50'></div> {/* Overlay */}
            <div className='bg-white p-6 rounded shadow-md z-30'>
                <h2 className='text-lg mb-4'>Are you sure you want to delete your account?</h2>
                <div className='flex justify-end'>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 mr-2 rounded'
                        onClick={onConfirm}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className='bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded'
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );    

    return (
        <div className='absolute inset-0 h-screen w-screen backdrop-blur-lg items-center justify-center flex z-10'>
            <form className='bg-white shadow-md rounded px-16 pt-8 pb-10 mb-4'>
                <div className='flex items-center justify-between p-6'>
                    <h2 className="flex-1 text-center text-xl leading-9 tracking-tight text-gray-900">
                        Settings
                    </h2>
                    <button
                        className='flex items-center p-1 text-white rounded'
                        type='button'
                        onClick={handleClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </button>
                </div>
                <div className='mb-4 bg-gray-100'>
                    <div className='flex items-center border rounded shadow appearance-none w-full'>
                    <i className='p-1 ml-2'>
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
        </i>
                        <label className='block text-gray-700 text-sm font-semibold mr-4 ml-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='shadow appearance-none w-full py-2 px-4 ml-0 text-gray-700 leading-tight focus:outline-none bg-gray-100'
                            id='username'
                            type='text'
                            value={username}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </div>
                </div>
                <div className='mb-4 bg-gray-100'>
                    <div className='flex items-center border rounded shadow appearance-none w-full'>
                    <i className='p-1 ml-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>       </i>

                        <label className='block text-gray-700 text-sm font-semibold ml-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                            className='shadow appearance-none w-full py-2 px-5 ml-11 text-gray-700 leading-tight focus:outline-none bg-gray-100'
                            id='email'
                            type='email'
                            value={email}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <div className={`flex items-center border rounded shadow appearance-none w-full ${!passwordValid ? 'border-2 border-red-500 shadow-[0_0_5px_rgba(255,0,0,0.5)]' : ''}`}>
                    <i className='p-1 ml-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                        </i>
                        <label className='block text-gray-700 text-sm font-semibold mr-4 ml-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='shadow appearance-none w-full py-2 px-5 ml-1 text-gray-700 leading-tight focus:outline-none'
                            id='password'
                            type={passwordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={handleInputChange}
                            placeholder="Enter New Password"
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
                <div className='mb-4'>
                    <div className={`flex items-center border rounded shadow appearance-none w-full ${!confirmPasswordValid ? 'border-2 border-red-500 shadow-[0_0_5px_rgba(255,0,0,0.5)]' : ''}`}>
                    <i className='p-1 ml-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                        </i>
                        <label className='block text-gray-700 text-sm font-semibold mr-4 ml-2' htmlFor='confirmPassword'>
                            Password
                        </label>
                        <input
                            className='shadow appearance-none w-full py-2 px-5 ml-1 text-gray-700 leading-tight focus:outline-none'
                            id='confirmPassword'
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        <button type="button" className="mx-2" onClick={toggleConfirmPasswordVisibility}>
                            {confirmPasswordVisible ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                            )}
                        </button>
                    </div>
                </div>
                {info && <p className='text-green-500'>{info}</p>}
                {error && <p className='text-red-500'>{error}</p>}
                <div className='flex items-center justify-center'>
                    <button
                        className='bg-custom-green hover:bg-custom-green-hover text-white font-semibold py-2 px-4 mt-5 w-full rounded focus:outline-none focus:shadow-outline mb-4'
                        type='button'
                        onClick={handleUpdateAccount}
                    >
                        Update Password
                    </button>
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline mb-4'
                        type='button'
                        onClick={handleShowModal}  // Changed to show modal
                    >
                        Delete Account
                    </button>
                </div>
            </form>
            {showModal && (
                <ConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default SettingsPageComponent;

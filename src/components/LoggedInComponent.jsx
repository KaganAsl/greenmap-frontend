import react from 'react';
import { loginIcon, logoutIcon, settingsIcon } from '../assets/icons';
import { useLoggedIn } from './Context';
import { useState, useEffect } from 'react';
import instance from '../js/connection';
import Cookies from 'js-cookie';




function LoggedInComponent({settingsButton, setSettingsButton, setLoginButton}) {
    const { loggedIn, setLoggedIn } = useLoggedIn();


    const handleLogout = () => {
        instance.post("/logout", null, {
        headers: {
            "Authorization": `${Cookies.get('GreenMap_AUTH')}`,
        },
        }).then((response) => {
            console.log(response);
            setLoggedIn(false);
            Cookies.remove('GreenMap_AUTH');
        }).catch((error) => {

        });
    };

    const handleSettingsButtonChange = () => {
        setSettingsButton(!settingsButton);
        setLoginButton(false);
    }

    return (
        <div className="bg-gray-200 p-4 mt-12 rounded-lg z-20">
            <div className='flex border border-green-700 rounded-2xl'>
                <div className='flex p-1'>
                <button className='flex items-center justify-center' onClick={handleLogout}>
                    <img src={logoutIcon.iconUrl} className='p-2' alt="Login" />
                    <h2 className='flex items-center p-1'>Logout </h2>
                </button>
                </div>
            </div>
            <div className='flex flex-row mt-2 border border-green-700 rounded-2xl'>
                <div className='flex p-1'>
                    <button className='flex items-center justify-center' onClick={handleSettingsButtonChange}>
                        <img src={settingsIcon.iconUrl} className='p-2' alt="Login" />
                        <h2 className='flex items-center p-1'>Settings</h2>
                    </button>
                    </div>
                </div>
        </div>
    );
}
export default LoggedInComponent;
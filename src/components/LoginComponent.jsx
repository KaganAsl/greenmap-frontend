import react from 'react';
import { loginIcon } from '../assets/icons';
import { useLoggedIn } from './Context';
import { useState, useEffect } from 'react';
import instance from '../js/connection';
import LoginCredentials from './LoginCredentials';
import LoggedInComponent from './LoggedInComponent';
import SettingsPageComponent from './SettingsPageComponent';



function LoginComponent() {
    const { loggedIn, setLoggedIn } = useLoggedIn();
    const [loginButton, setLoginButton] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [settingsButton, setSettingsButton] = useState(false);

    const handleButtonClick = () => {
        setLoginButton(!loginButton);
    };

    return (
        <div className="flex justify-end ">
            <div className="absolute p-4 z-20 flex">
                <div className="flex items-center bg-white rounded-lg">
                    <button className="" onClick={handleButtonClick}>
                        <img src={loginIcon.iconUrl} className='p-2' alt="Login" />
                    </button>
                </div>
            </div>
            <div className={"flex absolute p-4 justify-end " +  (!loggedIn || settingsButton ? "inset-0" : "left-auto right-0")}>
            {loginButton && !loggedIn ? <LoginCredentials /> : null}
            {loginButton && loggedIn ? <LoggedInComponent settingsButton={settingsButton} setSettingsButton={setSettingsButton} setLoginButton={setLoginButton} /> : null}
            {settingsButton && loggedIn ? <SettingsPageComponent setSettingsButton={setSettingsButton}  /> : null}
            </div>

        </div>
    );
}
export default LoginComponent;
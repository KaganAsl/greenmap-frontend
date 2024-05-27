import react from 'react';
import { loginIcon } from '../assets/icons';
import { useLoggedIn } from './Context';
import { useState, useEffect } from 'react';
import instance from '../js/connection';
import LoginCredentials from './LoginCredientals';
import LoggedInComponent from './LoggedInComponent';



function LoginComponent() {
    const { loggedIn, setLoggedIn } = useLoggedIn();
    const [loginButton, setLoginButton] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

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
            <div className="absolute inset-0 p-4 flex justify-end">
            {loginButton && !loggedIn ? <LoginCredentials /> : null}
            {loginButton && loggedIn ? <LoggedInComponent /> : null}
            </div>

        </div>
    );
}
export default LoginComponent;
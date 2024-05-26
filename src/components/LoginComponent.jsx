import react from 'react';
import { loginIcon } from '../assets/icons';
import { useLoggedIn } from './Context';


function LoginComponent() {
    const { loggedIn, setLoggedIn } = useLoggedIn();

    const handleButtonClick = () => {
        setLoggedIn(!loggedIn);
    };

    return (
        <div className="flex justify-end">
            <div className="absolute p-4 z-10 flex">
                <div className="flex items-center bg-white rounded-lg">
                    <button className="" onClick={handleButtonClick}>
                        <img src={loginIcon.iconUrl} className='p-2' alt="Login" />
                    </button>
                </div>
            </div>
            <div className="absolute mt-12 p-3 z-10 flex">
            {loggedIn ? (
                    <div className="bg-gray-200 p-4 mt-2 rounded-lg">
                        <p>Welcome! You are logged in.</p>
                    </div>
                ) : (
                    <div className="bg-gray-200 p-4 mt-2 rounded-lg">
                        <p>Please log in to continue.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
export default LoginComponent;
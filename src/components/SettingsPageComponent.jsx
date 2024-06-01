import react, {useState, useEffect} from 'react';
import instance from '../js/connection';
import Cookies from 'js-cookie';

function SettingsPageComponent({setSettingsButton}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Fetch user data
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
        }
        ).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    const handleInputChange = (event) => {
        if (event.target.id === 'username') {
            setUsername(event.target.value);
        } else if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else if (event.target.id === 'password') {
            setPassword(event.target.value);
        }
    }

    const handleClose = () => {
        setSettingsButton(false);
    }

    return (
        <div className='absolute inset-0 bg-white h-screen w-screen items-center justify-start rounded-r-xl flex z-30'>
            <form className='bg-white rounded px-12 pt-8 pb-10 mb-4 ml-6 flex flex-col'>
                <div className='mb-10'>
                    <h1 className='font-bold text-2xl'>Settings</h1>
                </div>
                <div className='flex flex-row mb-4 items-center'>
                    <label className='block text-gray-700 text-sm font-bold mr-20' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className='appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='username'
                        type='text'
                        placeholder="Something gone wrong!"
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex flex-row mb-4 items-center'>
                    <label className='block text-gray-700 text-sm font-bold mr-28' htmlFor='username'>
                        Email
                    </label>
                    <input
                        className='appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        readOnly={true}
                        placeholder="Something gone wrong!"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex flex-row mb-20 items-center'>
                    <label className='block text-gray-700 text-sm font-bold mr-20' htmlFor='username'>
                        Password
                    </label>
                    <input
                        className='appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='password'
                        type='password'
                        placeholder="Enter New Password"
                        onChange={handleInputChange}
                        value={password}
                    />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <button
                        className='border-4 rounded-lg text-custom-green hover:text-white hover:bg-custom-green font-bold py-2 px-6 mb-6 focus:outline-none focus:shadow-outline'
                        type='button'
                        //onClick={handleLogout}
                    >
                        Update Credientals
                    </button>
                    <button
                        className='border-4 rounded-lg text-red-500 hover:text-white hover:bg-red-700 font-bold py-2 px-10 mb-6 focus:outline-none focus:shadow-outline'
                        type='button'
                        //onClick={handleButtonClick}
                    >
                        Delete Account
                    </button>
                    <button
                        className='border-4 rounded-lg  text-custom-green hover:text-white hover:bg-custom-green font-bold py-2 px-10 mb-6 focus:outline-none focus:shadow-outline'
                        type='button'
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}
export default SettingsPageComponent;
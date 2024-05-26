import react from 'react';
import RadiusFilterSliderComponent from './RadiusSliderComponent';
import CategoryFilterComponent from './CategoryFilterComponent';
import { useState } from 'react';
import { burgerIcon, closeIcon, downIcon, filterIcon, searchIcon, upIcon} from '../assets/icons';
import { useLoggedIn } from './Context';


function MenuComponent() {
    const { loggedIn, setLoggedIn } = useLoggedIn();
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);


    const handleButtonClick = () => {
       setMenuOpen(!menuOpen);
    };

    const handleFilterClick = () => {
        setFilterOpen(!filterOpen);
    };

    if (!menuOpen) {
        return (
            <div className="flex justify-start">
                <div className="absolute p-4 z-10 flex">
                    <div className="flex items-center bg-white rounded-lg">
                        <button className="" onClick={handleButtonClick}>
                            <img src={burgerIcon.iconUrl} className='p-2' alt="Login" />
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-start w-screen">
                <div className="absolute z-10 flex w-1/4 h-screen">
                    <div className='z-10 bg-white w-screen'>
                        <div className='flex items-start justify-end'>
                            <button className='p-2' onClick={handleButtonClick}>
                                <img src={closeIcon.iconUrl} className='p-2' alt="Close" />
                            </button>
                        </div>
                        <div className='flex items-center justify-evenly'>
                            <button className='p-1'>
                                <img src={filterIcon.iconUrl} className='p-2' alt="Filter" />
                            </button>
                            {/*
                            <button className=''>
                                <img src={searchIcon.iconUrl} className='p-2' alt="Search" />
                            </button>
                            */}
                            <div className='p-1'>
                                <h2 className="font-bold">Filter</h2>
                            </div>
                            {filterOpen ? (
                                <div>
                                    <button className='' onClick={handleFilterClick}>
                                        <img src={downIcon.iconUrl} className='p-2' alt="Down" />
                                    </button>
                                </div>
                            ) : (
                                <div className=''>
                                    <button className='' onClick={handleFilterClick}>
                                        <img src={upIcon.iconUrl} className='p-2' alt="Down" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-4 flex flex-col items-center ">
                            {filterOpen ? <RadiusFilterSliderComponent /> : null}
                            {filterOpen ? <CategoryFilterComponent /> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MenuComponent;
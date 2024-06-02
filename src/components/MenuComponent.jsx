import react from 'react';
import RadiusFilterSliderComponent from './RadiusSliderComponent';
import CategoryFilterComponent from './CategoryFilterComponent';
import { useState } from 'react';
import { burgerIcon, closeIcon, downIcon, filterIcon, searchIcon, upIcon} from '../assets/icons';
import { useRadius, useCategory } from './Context';


function MenuComponent() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterOpen] = useState(true);
    const { radius, setRadius } = useRadius();
    const { category, setCategory } = useCategory();

    const handleRemoveFilters = () => {
        setRadius({radius: 0});
        setCategory(0);
    };

    const handleButtonClick = () => {
       setMenuOpen(!menuOpen);
    };

    if (!menuOpen) {
        return (
            <div className="flex justify-start">
                <div className="absolute p-4 z-10 flex">
                    <div className="flex items-center bg-white rounded-lg">
                        <button className="" onClick={handleButtonClick}>
                            <img src={filterIcon.iconUrl} className='p-2' alt="Login" />
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-start w-screen">
                <div className="absolute z-10 flex xs:w-1/2 sm:w-1/2 md:w-1/4 w-1/4 h-screen">
                    <div className='z-10 bg-white w-screen'>
                        <div className='flex items-start sm:justify-start xs:justify-start justify-end'>
                            <button className='p-2' onClick={handleButtonClick}>
                                <img src={closeIcon.iconUrl} className='p-2' alt="Close" />
                            </button>
                        </div>
                        <div className='flex items-center justify-evenly'>
                            <div className='p-1'>
                                <h2 className="font-semibold">Filter Pins</h2>
                            </div>
                            
                        </div>
                        <div className="p-4 flex flex-col ">
                            {filterOpen ? <RadiusFilterSliderComponent /> : null}
                            {filterOpen ? <CategoryFilterComponent /> : null}
                            {filterOpen ? (
                                <button onClick={handleRemoveFilters} className='ml-4 mr-4 pt-2 pb-2 bg-custom-green hover:bg-custom-green-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                    Remove Filters
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MenuComponent;
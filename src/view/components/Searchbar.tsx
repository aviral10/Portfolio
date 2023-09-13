import React, { useContext } from "react";
import GlobalStateContext from "./GlobalStateContext";

const Searchbar = () => {
    
    return (
        <div className="z-40 p-4 flex-shrink-0 shadow-sm shadow-gray-900 h-14 bg-gray-800">
            <HamburgerIcon/>
        </div>
    );
};

const HamburgerIcon = () => {
    const { hamburgerClicked, setHamburgerClicked } = useContext(GlobalStateContext);
    return (
        <div
            className="w-7 h-5 flex flex-col space-y-1 md:hidden"
            onClick={() => {
                setHamburgerClicked(!hamburgerClicked);
            }}
        >
            <div className="w-full h-1/3 bg-gray-500"></div>
            <div className="w-full h-1/3 bg-gray-500"></div>
            <div className="w-full h-1/3 bg-gray-500"></div>
        </div>
    );
};

export default Searchbar;

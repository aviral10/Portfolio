import React, { useContext } from "react";
import { SearchBarProps } from "./interfaces";
import AppContext from "./AppContext";
import Hamburger from "./GlobalStateContext";

const Searchbar = () => {
    const { hamburgerClicked, setHamburgerClicked } = useContext(Hamburger);
    return (
        <div className="z-40 p-4 flex-shrink-0 shadow-sm shadow-gray-900 h-14 bg-gray-800">
            <HamburgerIcon
                hamburgerClicked={hamburgerClicked}
                setHamburgerClicked={setHamburgerClicked}
            />
        </div>
    );
};

const HamburgerIcon = (props: {
    hamburgerClicked: Boolean;
    setHamburgerClicked: (hamburgerClicked: boolean) => void;
}) => {
    return (
        <div
            className="w-7 h-5 flex flex-col space-y-1 md:hidden"
            onClick={() => {
                props.setHamburgerClicked(!props.hamburgerClicked);
            }}
        >
            <div className="w-full h-1/3 bg-gray-500"></div>
            <div className="w-full h-1/3 bg-gray-500"></div>
            <div className="w-full h-1/3 bg-gray-500"></div>
        </div>
    );
};

export default Searchbar;

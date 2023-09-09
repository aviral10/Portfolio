import React, { useState } from "react";

const MyProfile = () => {
    return (
        <div className="hidden h-full md:flex flex-col md:w-1/4 bg-gray-800 text-white shadow-lg">
            {/* <App8/> */}
        </div>
    );
};

const App8 = () => {
    const [isLeftColumnVisible, setIsLeftColumnVisible] = useState(true);

    const toggleLeftColumn = () => {
        setIsLeftColumnVisible(!isLeftColumnVisible);
    };

    return (
        <div className="flex">
            {isLeftColumnVisible && (
                <div className="w-1/3 p-4 transform translate-x-0 transition-transform">
                    {/* Leftmost Div */}
                    <div className="bg-blue-500 h-48"></div>
                </div>
            )}
            <div className="w-1/3 p-4">
                {/* Middle Div */}
                <div className="bg-green-500 h-48"></div>
            </div>
            <div className="w-1/3 p-4">
                {/* Rightmost Div */}
                <div className="bg-red-500 h-48"></div>
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 rounded"
                onClick={toggleLeftColumn}
            >
                Toggle Left Column
            </button>
        </div>
    );
};

export default MyProfile;

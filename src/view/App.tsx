import React from "react";
import Sidebar from "./components/Sidebar";
import Channels from "./components/Channels";
import Messages from "./components/Messages";
import MyProfile from "./components/MyProfile"
import Searchbar from "./components/Searchbar";


function App() {

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-900">
                <div className="w-full bg-gray-900 flex-shrink-0 h-4"></div>
                <div className="flex h-screen">
                    <Sidebar/>
                    <div className="flex w-screen">
                        <Channels/>
                        <div className="PPP flex flex-col h-full w-full">
                            <Searchbar/>
                            <div className="flex w-full h-full">
                                <Messages/>
                                <MyProfile/>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>
    );
}

export default App;

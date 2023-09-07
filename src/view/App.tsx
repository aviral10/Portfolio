import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Channels from "./components/Channels";
import Messages from "./components/Messages";
import MyProfile from "./components/MyProfile";
import Searchbar from "./components/Searchbar";
import { tempServer, tempServer_dup } from "./components/TempData";
import AppContext from "./components/AppContext";
import DataModel from "../model/DataModel";

function App() {
    const serverList = useRef<Promise<any>[]>()
    const [server, setServer] = useState(tempServer);

    useEffect(()=>{
        async function getServerList(){
            serverList.current = await DataModel.getInstance().getServerList()
            console.log(serverList)
            setServer(tempServer_dup)
        }
        getServerList()
    }, [])
    return (
        <AppContext.Provider value={{ server, setServer }}>
            <div className="flex flex-col h-screen bg-gray-900">
                <div className="w-full bg-gray-900 flex-shrink-0 h-4 text-gray-500 font-bold text-[12px] pl-2">BigPanda</div>
                <div className="flex h-screen">
                    <Sidebar />
                    <div className="flex w-screen">
                        <Channels server={server} />
                        <div className="flex flex-col h-full w-full">
                            <Searchbar />
                            <div className="flex w-full h-full">
                                <Messages />
                                <MyProfile />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Channels from "./components/Channels";
import Messages from "./components/Messages";
import MyProfile from "./components/MyProfile";
import Searchbar from "./components/Searchbar";
import AppContextType from "./components/AppContext";
import GlobalStateContext from "./components/GlobalStateContext";
import useWindowDimensions from "./components/useWindowDimensions";
import DataModelJson from "../model/DataModelJson";
import backupConfig from "../model/fallbackConfig.json";
import { Server } from "./components/interfaces";
import { splitIds } from "../model/utils";
import AppContext from "./components/AppContext";

function App() {
    // Refs
    const serverList = useRef<Server[] | undefined>(undefined);

    // State
    const [server, setServer] = useState<Server | undefined>(undefined);
    const { width } = useWindowDimensions();
    const [hamburgerClicked, setHamburgerClicked] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState("0-0");
    const [selectedServer, setSelectedServer] = useState(0);


    useEffect(() => {
        const model = new DataModelJson(backupConfig);
        serverList.current = model.getServerList();
        setServer(serverList.current?.[0]);
    }, []);

    if (serverList.current === undefined || server === undefined) {
        return <h1>Loading...</h1>;
    }

    const [channelGroupId, channelId] = splitIds(selectedChannel)
    const toShowOrNotToShow = () => {
        return width >= 768
            ? "translate-x-0"
            : hamburgerClicked
            ? "-translate-x-32"
            : "-translate-x-[calc(100%+80px)]";
    };
    return (
        <AppContext.Provider value={{ server: server, setServer: setServer, serverList: serverList.current}}>
            <GlobalStateContext.Provider
                value={{
                    hamburgerClicked,
                    setHamburgerClicked,
                    selectedChannel,
                    setSelectedChannel,
                    selectedServer,
                    setSelectedServer
                }}
            >
                <div className="fixed md:block flex flex-col h-full w-full bg-gray-900">
                    <div className="w-full bg-gray-900 flex-shrink-0 h-4 text-gray-500 font-[900] text-[12px] pl-2">
                        BigPanda
                    </div>
                    <div className={`flex h-full`}>

                        <Sidebar serverList={serverList.current} selectedServer={selectedServer} setSelectedServer={setSelectedServer} />

                        <div className="flex w-full">
                            <Channels
                                selectedChannel={selectedChannel}
                                setSelectedChannel={setSelectedChannel}
                            />
                            <div
                                className={`flex flex-col h-full w-full ease-in-out duration-300 ${toShowOrNotToShow()}`}
                            >
                                <Searchbar />
                                <div className="flex w-full h-full overflow-hidden">
                                    <Messages
                                        messageHeader={
                                            server.channelGroups[channelGroupId]
                                                .channelItems[channelId]
                                                .messageHeader
                                        }
                                        messageGroups={
                                            server.channelGroups[channelGroupId]
                                                .channelItems[channelId]
                                                .messageGroups
                                        }
                                    />
                                    
                                    <MyProfile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GlobalStateContext.Provider>
        </AppContext.Provider>
    );
}

export default App;

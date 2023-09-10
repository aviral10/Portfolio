import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Sidebar from "./components/Sidebar";
import Channels from "./components/Channels";
import Messages from "./components/Messages";
import MyProfile from "./components/MyProfile";
import Searchbar from "./components/Searchbar";
import { tempServer, tempServer_dup } from "./components/TempData";
import AppContext from "./components/AppContext";
import GlobalStateContext from "./components/GlobalStateContext";
import useWindowDimensions from "./components/useWindowDimensions";
import DataModelGithub from "../model/DataModelGithub";
import DataModel from "../model/DataModel";
import DataModelJson from "../model/DataModelJson";
import backupConfig from "../model/fallbackConfig.json";
import { Server } from "./components/interfaces";

function App() {
    const serverList = useRef<Server[]>();
    const [server, setServer] = useState<Server>(tempServer);
    const { height, width } = useWindowDimensions();
    const [hamburgerClicked, setHamburgerClicked] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState("0-0");
    
    // const gist = "ab03cbf6009cff87e7fdcd1b309cf438";
    // const fileName = "randomjsontwo.json";
    // const model:DataModel = new DataModelGithub(gist, fileName);

    useEffect(() => {
        const model: DataModel = new DataModelJson(backupConfig);
        serverList.current = model.getServerList();
        console.log(serverList.current);
        setServer(serverList.current[0]);
    }, []);


    if (serverList.current == undefined) {
        return <h1>BT</h1>;
    }

    let [channelGroupId, channelId] = selectedChannel.split("-").map((val) => +val);

    return (
        <AppContext.Provider value={{ server, setServer }}>
            <GlobalStateContext.Provider
                value={{ hamburgerClicked, setHamburgerClicked, selectedChannel, setSelectedChannel }}
            >
                <div className="fixed flex flex-col h-screen bg-gray-900">
                    <div className="w-full bg-gray-900 flex-shrink-0 h-4 text-gray-500 font-[900] text-[12px] pl-2">
                        BigPanda
                    </div>
                    <div
                        className={`flex h-full ease-in-out duration-300 ${
                            width >= 768 || hamburgerClicked
                                ? "translate-x-0"
                                : "-translate-x-3/4"
                        }`}
                    >
                        <div className={`left-0 h-full w-20 `}></div>
                        <Sidebar serverList={serverList.current} />

                        <div className="flex w-screen">
                            <Channels
                                selectedChannel={selectedChannel}
                                setSelectedChannel={setSelectedChannel}
                            />
                            <div className="flex flex-col h-full w-full">
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
                                                .channelItems[channelId].messageGroups
                                        }
                                    />
                                    <div className="bg-gray-700 w-1 h-full"></div>
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

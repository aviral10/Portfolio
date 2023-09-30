import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Channels from "./components/Channels";
import Messages from "./components/Messages";
import MyProfile from "./components/MyProfile";
import Searchbar from "./components/Searchbar";
import GlobalStateContext from "./components/GlobalStateContext";
import useWindowDimensions from "./components/useWindowDimensions";
import DataModelJson from "../model/DataModelJson";
import backupConfig from "../model/fallbackConfig.json";
import { HomeScreenProps, Server } from "../model/interfaces";
import { splitIds } from "../model/utils";
import AppContext from "./components/AppContext";
import IdStore from "../model/IdStore";
import Shimmer from "./components/Shimmer";
import KeyGenerator from "../model/KeyGenerator";


function HomeScreen(props: HomeScreenProps) {
    // Refs
    const serverList = props.serverList;
    // State
    const server = props.server;
    const setServer = props.setServer;
    const [hamburgerClicked, setHamburgerClicked] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState("0-0-0");
    const [selectedServer, setSelectedServer] = useState(0);
    const { width } = useWindowDimensions();

    const [serverId, channelGroupId, channelId] = splitIds(selectedChannel);

    const toShowOrNotToShow = () => {
        return width >= 768
            ? "translate-x-0"
            : hamburgerClicked
            ? "-translate-x-32"
            : "-translate-x-[calc(100%+80px)]";
    };

    return (
        <AppContext.Provider
            value={{
                server: server,
                setServer: setServer,
                serverList: serverList,
            }}
        >
            <GlobalStateContext.Provider
                value={{
                    hamburgerClicked,
                    setHamburgerClicked,
                    selectedChannel,
                    setSelectedChannel,
                    selectedServer,
                    setSelectedServer,
                }}
            >
                <div className="fixed md:block flex flex-col h-full w-full bg-gray-900">
                    <div className="w-full bg-gray-900 flex-shrink-0 h-4 text-gray-500 font-[900] text-[12px] pl-2">
                        BigPanda
                    </div>
                    <div className={`flex h-full`}>
                        <Sidebar
                            serverList={serverList}
                            selectedServer={selectedServer}
                            setSelectedServer={setSelectedServer}
                        />

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

function App() {
    // Refs
    const serverList = useRef<Server[] | undefined>(undefined);

    // State
    const [server, setServer] = useState<Server | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            const model = new DataModelJson(backupConfig);
            serverList.current = model.getServerList();
            setServer(serverList.current?.[0]);
            IdStore.getInstance().populate(serverList.current);
        }, 2000);
    }, []);

    return (
        <div>
            {serverList.current === undefined || server === undefined ? (
                <Shimmer />
            ) : (
                <HomeScreen
                    server={server}
                    setServer={setServer}
                    serverList={serverList.current!}
                />
            )}
        </div>
    );
}

export default App;

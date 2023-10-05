import { useState, useEffect, useRef } from "react";
import { HomeScreenProps, Server } from "../model/interfaces";
import { mediumScreen, splitIds } from "../model/utils";

import backupConfig from "../model/fallbackConfig.json";
import useWindowDimensions from "./hooks/useWindowDimensions";
import AppContext from "./components/AppContext";
import Channels from "./components/Channels";
import Config from "../model/Config";
import DataModelJson from "../model/DataModelJson";
import GlobalStateContext from "./components/GlobalStateContext";
import IdStore from "../model/IdStore";
import Messages from "./components/Messages";
import MyProfile from "./components/MyProfile";
import Searchbar from "./components/Searchbar";
import Sidebar from "./components/Sidebar";
import Shimmer from "./components/Shimmer";
import AnonymousAnimal from "../model/AnonymousAnimal";

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
    // Initialise Anonymous animals, so animal image is prefetched
    AnonymousAnimal.getInstance()

    const toShowOrNotToShow = () => {
        return width >= mediumScreen
            ? "translate-x-0"
            : hamburgerClicked
            ? "-translate-x-32"
            : "-translate-x-[calc(100%+80px)]";
    };

    width < mediumScreen ? registerSwipes(setHamburgerClicked) : null;

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

const registerSwipes = (
    setHamburgerClicked: (hamburgerClicked: boolean) => void
) => {
    let touchstartX = 0;
    let touchendX = 0;

    function commenceAction() {
        (touchendX - touchstartX < -100)?setHamburgerClicked(false):null;
        (touchendX - touchstartX > 100)?setHamburgerClicked(true):null;
    }

    document.addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        commenceAction();
    });
};

function App() {
    // Refs
    const serverList = useRef<Server[] | undefined>(undefined);

    // State
    const [server, setServer] = useState<Server | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            //
            Config.updateConfig(backupConfig);
            //
            const model = new DataModelJson(Config.getConfig());
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

import { useState, useEffect } from "react";
import Analytics from "../../model/Analytics/Analytics";
import AnonymousAnimal from "../../model/AnonymousAnimal";
import { HomeScreenProps } from "../../model/interfaces";
import { splitIds, mediumScreen } from "../../model/utils";
import useWindowDimensions from "../hooks/useWindowDimensions";
import AppContext from "./AppContext";
import Channels from "./Channels";
import GlobalStateContext from "./GlobalStateContext";
import Messages from "./Messages";
import MyProfile from "./MyProfile";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

const HomeScreen = (props: HomeScreenProps) => {
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
    AnonymousAnimal.getInstance();
    // Initialize Analytics
    Analytics.getInstance();

    const toShowOrNotToShow = () => {
        return width >= mediumScreen
            ? "translate-x-0"
            : hamburgerClicked
            ? "-translate-x-32"
            : "-translate-x-[calc(100%+80px)]";
    };

    useEffect(() => {
        let pageName = serverList[serverId]
                                .channelGroups[channelGroupId]
                                .channelItems[channelId]
                                .name
                                .toLowerCase();
        Analytics.sendPageView(pageName);
        
    }, [selectedChannel]);

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
};

const registerSwipes = (
    setHamburgerClicked: (hamburgerClicked: boolean) => void
) => {
    let touchstartX = 0;
    let touchendX = 0;

    function commenceAction() {
        touchendX - touchstartX < -100 ? setHamburgerClicked(false) : null;
        touchendX - touchstartX > 100 ? setHamburgerClicked(true) : null;
    }

    document.addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        commenceAction();
    });
};

export default HomeScreen;

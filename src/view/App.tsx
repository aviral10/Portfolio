import { useState, useEffect, useRef } from "react";
import { Server } from "../model/Interfaces";

import backupConfig from "../model/fallbackConfig.json";
import Config from "../model/Config";
import DataModelJson from "../model/DataModelJson";
import IdStore from "../model/IdStore";
import Shimmer from "./components/Shimmer";
import ImageCache from "../model/ImageCache";
import HomeScreen from "./components/HomeScreen";
import FetchRemoteConfig from "../model/FetchRemoteConfig";

function App() {
    // Refs
    const serverList = useRef<Server[] | undefined>(undefined);

    // State
    const [server, setServer] = useState<Server | undefined>(undefined);

    const updateServerList = () => {
        const model = new DataModelJson(Config.getConfig());
        serverList.current = model.getServerList();
        setServer(serverList.current?.[0]);
        IdStore.getInstance().populate(serverList.current);
        ImageCache.prefetch(serverList.current);
    };

    useEffect(() => {
        setTimeout(() => {
            // Attempt fetching remote Config
            try {
                let url = "https://raw.githubusercontent.com/aviral10/Public-assets/main/portfolioConfig.json";
                let fetchRemoteConfig = new FetchRemoteConfig(url);
                fetchRemoteConfig.fetchRemoteData().then((data) => {
                    data ? Config.updateConfig(data) : null; 
                    updateServerList();
                });
                console.log("Using remote config")
            } catch (error) {
                console.error(
                    "Could not fetch remote config, falling back to backup config"
                );
                updateServerList();
                console.log("Using backup config")
            }
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

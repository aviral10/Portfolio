import { useState, useEffect, useRef } from "react";
import { Server } from "../model/interfaces";

import backupConfig from "../model/fallbackConfig.json";
import Config from "../model/Config";
import DataModelJson from "../model/DataModelJson";
import IdStore from "../model/IdStore";
import Shimmer from "./components/Shimmer";
import ImageCache from "../model/ImageCache";
import HomeScreen from "./components/HomeScreen";

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
            ImageCache.prefetch(serverList.current);
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

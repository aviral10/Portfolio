import { useContext } from "react";
import { splitIds } from "../../model/utils";
import AppContext from "../components/AppContext";
import GlobalStateContext from "../components/GlobalStateContext";

export const Mention = ({
    content,
    selectedChannel,
}: {
    content: string;
    selectedChannel: string;
}) => {
    const { server, setServer, serverList } = useContext(AppContext);
    const globalStateContext = useContext(GlobalStateContext);
    const [serverId, channelGroupId, channelId] = splitIds(selectedChannel);
    return (
        <span
            className="bg-starblue-100 opacity-75 rounded-md font-medium pr-1 cursor-pointe ml-1 mr-1 cursor-pointer"
            onClick={() => {
                setServer(serverList[serverId]);
                globalStateContext.setSelectedChannel(
                    serverId + "-" + channelGroupId + "-" + channelId
                );
                globalStateContext.setSelectedServer(serverId);
            }}
        >
            {" @ " + content}
        </span>
    );
};

export default Mention;

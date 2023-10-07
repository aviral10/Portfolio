import { useContext } from "react";
import GlobalStateContext from "./GlobalStateContext";
import AppContext from "./AppContext";
import Cat_4 from "../../assets/cat_4.gif";
import { splitIds } from "../../model/Utils";

const Searchbar = () => {
    const { server } = useContext(AppContext);
    const globalStateContext = useContext(GlobalStateContext);
    const [serverId, channelGroupId, channelId] = splitIds(globalStateContext.selectedChannel);
    
    return (
        <div className="flex items-center space-x-3 z-40 p-4 flex-shrink-0 shadow-sm shadow-gray-900 h-14 bg-gray-800">
            <HamburgerIcon />
            <span className="text-2xl ml-2 text-gray-500 font-bold">@</span>
            <p className="text-gray-100 text-xl pt-[0.5] flex-shrink-0">
                {server.channelGroups[channelGroupId].channelItems[
                    channelId
                ].name.toLowerCase()}
            </p>
            <div className="w-14">
                <img className="hover:scale-110" src={Cat_4} alt="" />
            </div>
        </div>
    );
};

const HamburgerIcon = () => {
    const { hamburgerClicked, setHamburgerClicked } = useContext(GlobalStateContext);
    
    return (
        <div
            className="w-7 h-5 flex flex-col space-y-1 md:hidden"
            onClick={() => {
                setHamburgerClicked(!hamburgerClicked);
            }}
        >
            <div className="w-full h-1/3 bg-gray-500"></div>
            <div className="w-full h-1/3 bg-gray-500"></div>
            <div className="w-full h-1/3 bg-gray-500"></div>
        </div>
    );
};

export default Searchbar;

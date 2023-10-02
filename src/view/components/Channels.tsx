import React, { useContext, useState } from "react";
import {
    ChannelGroupProps,
    ChannelItem,
    ChannelItemsProps,
    ChannelsProps,
} from "../../model/interfaces";
import KeyGenerator from "../../model/KeyGenerator";
import AppContext from "./AppContext";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import GlobalStateContext from "./GlobalStateContext";
import DiscordLogo from "../../assets/discord-logo-b.png"
import Cat_B from "../../assets/cat_2.gif"
import Cat_9 from "../../assets/cat_9.gif"
import Cat_10 from "../../assets/cat_10.gif"
import DataModelJson from "../../model/DataModelJson";
import Config from "../../model/Config";

const Channels = (props: ChannelsProps) => {
    const { server } = useContext(AppContext);
    const { selectedChannel, setSelectedChannel } = props;

    return (
        <div className="w-full md:min-w-[200px] md:flex flex-shrink-0 flex-col h-full md:w-1/5 bg-gray-800 text-white rounded-tl-lg">
            <ChannelTitle name={server.name} />
            {server.channelGroups.map((channelGroup, index) => (
                <ChannelGroup
                    key={KeyGenerator.getInstance().getNewKey()}
                    index={index}
                    channelGroup={channelGroup}
                    selectedChannel={selectedChannel}
                    setSelectedChannel={setSelectedChannel}
                />
            ))}
            <ChannelFooter/>
        </div>
    );
};

const ChannelTitle = (props: { name: string }) => (
    <div className="flex items-center p-4 flex-shrink-0 shadow-sm shadow-gray-900 h-14 text-lg">
        {props.name}
        
    </div>
);

const ChannelFooter = ()=>{
    const model = new DataModelJson(Config.getConfig());
    const myProfile = model.getMyProfile();
    
    return (
        <div className="fixed flex bottom-0 w-full bg-gray-900 space-x-3 flex-shrink-0 h-14 p-2">
            <img className="absolute w-24 rotate-12 -translate-y-[72px] hover:scale-110" src={Cat_10} alt="" />
            <img className="rounded-3xl" src={myProfile.discordImage} alt="" />
            <div className="flex flex-col">
                <div className="text-sm font-medium">Koro Sensei</div>
                <div className="text-xs">_bigppanda_</div>
            </div>
            <div className="flex items-center">
                <a href={myProfile.discord} target="_blank"><img className="w-12 h-7 hover:animate-[spin_0.5s_ease-in-out]" src={DiscordLogo} alt="" /></a>
                <img className="w-10 md:w-14 hover:scale-110" src={Cat_9} alt="" />
            </div>
        </div>
    )
}

const ChannelGroup = (props: ChannelGroupProps) => {
    const [showFull, setShowFull] = useState(true);

    const toggleShowFull = () => {
        setShowFull(!showFull);
    };

    return (
        <div className="space-y-1 w-full p-4 pb-0 text-gray-500">
            <div className="flex text-xs font-bold pb-1">
                <div
                    className={`text-base transform transition-transform duration-150`}
                ></div>
                <TfiAngleDoubleRight className="mt-[1.5px] mr-1" />
                {props.channelGroup.name.toUpperCase()}
            </div>
            <ChannelItems
                items={showFull ? props.channelGroup.channelItems : []}
                parent={props.index}
                selectedChannel={props.selectedChannel}
                setSelectedChannel={props.setSelectedChannel}
            />
        </div>
    );
};

const ChannelItems = (props: ChannelItemsProps) => {
    const { hamburgerClicked, setHamburgerClicked, selectedChannel,
        setSelectedChannel,
        selectedServer,
        setSelectedServer } = useContext(GlobalStateContext)
    return (
        <div>
            {props.items.map((item: ChannelItem, index: number) => {
                const itemIndex = `${selectedServer}-${props.parent}-${index}`;

                const handleClick = () => {
                    props.setSelectedChannel(itemIndex);
                    setHamburgerClicked(false)
                };

                const isItemSelected = props.selectedChannel === itemIndex;

                return (
                    <div
                        key={KeyGenerator.getInstance().getNewKey()}
                        className={`p-1 flex space-x-2 rounded-md hover:text-gray-200 cursor-pointer ${
                            isItemSelected
                                ? "bg-gray-650 text-gray-200"
                                : "text-gray-500 hover:bg-gray-700"
                        }`}
                        onClick={handleClick}
                    >
                        <span className="text-base ml-2 text-gray-500 font-bold">
                            @
                        </span>
                        <p className="text-base pt-[0.5]">
                            {item.name.toLowerCase()}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Channels;

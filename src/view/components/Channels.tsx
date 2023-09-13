import React, { useContext, useState } from "react";
import {
    ChannelGroupProps,
    ChannelItem,
    ChannelItemsProps,
    ChannelsProps,
} from "./interfaces";
import KeyGenerator from "../../model/KeyGenerator";
import AppContext from "./AppContext";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import GlobalStateContext from "./GlobalStateContext";

const Channels = (props: ChannelsProps) => {
    const { server } = useContext(AppContext);
    const { selectedChannel, setSelectedChannel } = props;

    return (
        <div className="min-w-[70%] md:min-w-[200px] md:flex flex-shrink-0 flex-col h-full w-1/5 bg-gray-800 text-white rounded-tl-lg">
            <ChannelTitle name={server.name} />
            {server.channelGroups.map((channelGroup) => (
                <ChannelGroup
                    key={KeyGenerator.getInstance().getNewKey()}
                    channelGroup={channelGroup}
                    selectedChannel={selectedChannel}
                    setSelectedChannel={setSelectedChannel}
                />
            ))}
        </div>
    );
};

const ChannelTitle = (props: { name: string }) => (
    <div className="flex items-center justify-center z-50 flex-shrink-0 shadow-sm shadow-gray-900 h-14 text-lg">
        {props.name}
    </div>
);

const ChannelGroup = (props: ChannelGroupProps) => {
    const [showFull, setShowFull] = useState(true);

    const toggleShowFull = () => {
        setShowFull(!showFull);
    };

    return (
        <div className="space-y-1 w-full p-4 pb-0 text-gray-500">
            <div className="flex text-xs font-bold pb-1">
                <div
                    className={`text-md transform transition-transform duration-150 ${null}`}
                ></div>
                <TfiAngleDoubleRight className="mt-[1.5px] mr-1" />
                {props.channelGroup.name.toUpperCase()}
            </div>
            <ChannelItems
                items={showFull ? props.channelGroup.channelItems : []}
                parent={props.channelGroup.id}
                selectedChannel={props.selectedChannel}
                setSelectedChannel={props.setSelectedChannel}
            />
        </div>
    );
};

const ChannelItems = (props: ChannelItemsProps) => {
    const { hamburgerClicked, setHamburgerClicked } = useContext(GlobalStateContext)
    return (
        <div>
            {props.items.map((item: ChannelItem, index: number) => {
                const itemIndex = `${props.parent}-${index}`;

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
                        <span className="text-md ml-2 text-gray-500 font-bold">
                            @
                        </span>
                        <p className="text-md pt-[0.5]">
                            {item.name.toLowerCase()}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Channels;

import React, { useContext, useEffect, useState } from "react";
import {
    ChannelGroupProps,
    ChannelGroup,
    ChannelItemsProps,
    ChannelItem,
    ChannelsProps,
} from "./interfaces";
import KeyGenerator from "../../model/KeyGenerator";
import AppContext from "./AppContext";
import { TfiAngleDoubleRight } from "react-icons/tfi";

const Channels = (props: ChannelsProps) => {
    //
    let { server, setServer } = useContext(AppContext);
    let selectedChannel = props.selectedChannel;
    let setSelectedChannel = props.setSelectedChannel;
    let channelGroups: ChannelGroup[] = [];
    server.channelGroups.map((ChannelGroup) => {
        channelGroups.push(ChannelGroup);
    });

    return (
        <div
            className="min-w-[70%] md:min-w-max md:flex flex-col h-full w-1/5 bg-gray-800 text-white
                        rounded-tl-lg"
        >
            <ChannelTitle name={server.name} />
            {channelGroups.map((channelGroup) => {
                return (
                    <ChannelGroup
                        key={KeyGenerator.getInstance().getNewKey()}
                        name={channelGroup.name.toUpperCase()}
                        items={channelGroup.channelItems}
                        id={channelGroup.id}
                        selectedChannel={selectedChannel}
                        setSelectedChannel={setSelectedChannel}
                    />
                );
            })}
        </div>
    );
};

const ChannelTitle = (props: { name: string }) => {
    return (
        <div
            className="flex items-center justify-center z-50 flex-shrink-0 shadow-sm shadow-gray-900 h-14
                        text-lg"
        >
            {props.name}
        </div>
    );
};

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
                {props.name}
            </div>
            <ChannelItems
                items={showFull ? props.items : []}
                parent={props.id}
                selectedChannel={props.selectedChannel}
                setSelectedChannel={props.setSelectedChannel}
            />
        </div>
    );
};

const ChannelItems = (props: ChannelItemsProps) => {
    return props.items.map((item: ChannelItem, index: number) => {
        let itemIndex = props.parent.toString() + "-" + index.toString();
        return (
            <div
                key={KeyGenerator.getInstance().getNewKey()}
                className={`p-1 flex space-x-2   rounded-md hover:text-gray-200 cursor-pointer
                            ${
                                props.selectedChannel === itemIndex
                                    ? "bg-gray-650 text-gray-200"
                                    : "text-gray-500 hover:bg-gray-700"
                            }`}
                onClick={() => {
                    props.setSelectedChannel(itemIndex);
                }}
            >
                <span className="text-md ml-2 text-gray-500 font-bold">@</span>
                <p className="text-md pt-[0.5]">{item.name}</p>
            </div>
        );
    });
};

export default Channels;

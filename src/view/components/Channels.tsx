import React, { useState } from "react";
import { Server, ChannelGroupProps, ChannelGroups, ChannelItemsProps } from "./interfaces";
import KeyGenerator from "../../model/KeyGenerator";

const Channels = (props:{server:Server}) => {
    //
    let server = props.server;
    let channelGroups: ChannelGroups[] = [];
    server.channelGroups.map((ChannelGroup) => {
        channelGroups.push(ChannelGroup);
    });
    //
    return (
        <div
            className="hidden md:flex flex-col h-full w-1/5 bg-gray-800 text-white
                        rounded-tl-lg">
            <ChannelTitle name={server.name} />
            {channelGroups.map((channelGroup, index) => {
                return (
                    <ChannelGroup
                        key={KeyGenerator.getInstance().getKey()}
                        name={channelGroup.name.toUpperCase()}
                        items={channelGroup.channelItems}
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
    const [isSelected, setIsSelected] = useState(-1);
    const toggleShowFull = () => {
        setShowFull(!showFull);
    };
    return (
        <div className="w-full p-4 pb-0 font-larry text-gray-500">
            <div
                className="flex text-xs font-bold cursor-pointer"
                onClick={() => toggleShowFull()}>
                <div className={`text-md transform transition-transform duration-150 ${
                        showFull ? "rotate-90" : ""
                    }`}>
                    {">"}
                </div>
                <pre> </pre>
                {props.name}
            </div>
            <ChannelItems items={showFull ? props.items : []} isSelectedState={[isSelected, setIsSelected]} />
        </div>
    );
};

const ChannelItems = (props: ChannelItemsProps) => {
    return props.items.map((item: string, index: number) => {
        return (
            <div
                key={KeyGenerator.getInstance().getKey()}
                className={`p-1 flex space-x-2 hover:bg-gray-700  rounded-md hover:text-gray-200 cursor-pointer
                            ${props.isSelectedState[0] == index?"bg-gray-650 text-gray-100":"text-gray-500"}`} onClick={()=>{props.isSelectedState[1](index)}}>
                <span className="text-xl ml-2 text-gray-500 font-bold">@</span>
                <p className="text-md pt-[0.5]">{item}</p>
            </div>
        );
    });
};

export default Channels;

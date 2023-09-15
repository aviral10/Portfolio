import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Message,
    MessageGroup,
    MessageType,
    MessagesProps,
    ScrollableComponentProps,
} from "./interfaces";
import Markdown from "react-markdown";
import KeyGenerator from "../../model/KeyGenerator";
import { AiOutlineSend } from "react-icons/ai";
import Resume from "../../assets/AviralRana_Resume_SDE_v2.pdf";
import GlobalStateContext from "./GlobalStateContext";
import { splitIds } from "../../model/utils";
import AppContext from "./AppContext";

const scrollToBottom = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
};

const Messages = (props: MessagesProps) => {
    const ref = useRef(null);
    const firstRender = useRef(true)
    const globalStateContext = useContext(GlobalStateContext);
    const { server, setServer } = useContext(AppContext);

    // Typescript was complaining here :(
    const messageGroupState = useState(props.messageGroups);
    const messageGroup = messageGroupState[0]
    const setMessageGroup = messageGroupState[1]

    const [serverId, channelGroupId, channelId] = splitIds(globalStateContext.selectedChannel)

    useEffect(()=>{
        setMessageGroup(props.messageGroups)
        firstRender.current = true
    }, [globalStateContext.selectedChannel])

    useEffect(()=>{
        firstRender.current?firstRender.current=false:scrollToBottom(ref);
    }, [messageGroup])

    return (
        <div className="flex flex-col flex-shrink-0 h-full w-full md:w-[75%] bg-gray-700 text-white shadow-lg">
            <ScrollableComponent
                messageHeader={props.messageHeader}
                messageGroups={messageGroup}
                endRef={ref}
            />
            <InputComponent
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        
                        const sampleMessage: Message = {
                            sender: {
                                name: "Random Man",
                                icon: "",
                            },
                            content: e.target.value,
                            image: "",
                            messageType: MessageType.DEFAULT,
                        };
                        const sample: MessageGroup = {
                            date: "20 Aug, 2023",
                            messages: [sampleMessage],
                        };
                        e.target.value = "";
                        server.channelGroups[channelGroupId].channelItems[channelId].messageGroups.push(sample);
                        let nw = structuredClone(
                            server.channelGroups[channelGroupId].channelItems[channelId].messageGroups
                        );
                        setMessageGroup(nw);
                    }
                }}
            />
        </div>
    );
};

const InputComponent = ({ onKeyDown }: { onKeyDown: (event: any) => void }) => {
    return (
        <div className="bottom-0 flex h-16 w-full ">
            <div className="flex bg-gray-650 w-full h-10 m-4 mt-0 p-2 rounded-xl">
                <div className="w-4"></div>
                <input
                    className="w-full bg-gray-650 focus:outline-none placeholder-gray-500"
                    type="text"
                    placeholder="Enter Text"
                    onKeyDown={onKeyDown}
                />
                <div className="right-0 flex items-center justify-center cursor-pointer">
                    <AiOutlineSend />
                </div>
            </div>
        </div>
    );
};

const ScrollableComponent = (props: ScrollableComponentProps) => {
    const { messageHeader, messageGroups } = props;
    const [header1, header2, header3] = messageHeader;

    return (
        <div className="w-full h-[calc(100%-64px)] rounded-lg overflow-y-scroll">
            <div className="p-4 md:p-4">
                <div className="w-[92vw] md:w-full flex flex-col items-center justify-center text-3xl font-semibold mb-4">
                    <p>{header1}</p>
                    <p>{header2}</p>
                    <p className="pt-3 text-sm font-extralight text-gray-500">
                        {header3}
                    </p>
                </div>

                {messageGroups.map((messageGroup) => (
                    <MessageGroup
                        key={KeyGenerator.getInstance().getNewKey()}
                        messageGroup={messageGroup}
                    />
                ))}
                <div ref={props.endRef} className="LAST"></div>
            </div>
        </div>
    );
};

const MessageGroup = (props: { messageGroup: MessageGroup }) => {
    const { date, messages } = props.messageGroup;

    return (
        <div className="h-full w-full">
            <div className="pb-4 flex items-center justify-center">
                <div className="w-3/5">
                    <hr className="h-px border-0 bg-gray-600" />
                </div>
                <div className="text-xs text-gray-500 w-1/6 flex flex-shrink-0 min-w-max items-center justify-center">
                    {date}
                </div>
                <div className="w-3/5">
                    <hr className="h-px border-0 bg-gray-600" />
                </div>
            </div>
            {messages.map((message) => (
                <MessageItem
                    key={KeyGenerator.getInstance().getNewKey()}
                    message={message}
                    messageType={message.messageType}
                />
            ))}
        </div>
    );
};

export interface MessageItemProps {
    message: Message;
    messageType: MessageType;
}

const MessageItemDefault = ({ message }: { message: Message }) => {
    const { sender, content, image } = message;
    const { server, setServer} = useContext(AppContext);
    const globalStateContext = useContext(GlobalStateContext);

    return (
        <div className="text-xs md:text-base">
            <pre className="font-larry font-light break-words whitespace-pre-wrap overflow-x-auto">
                {content} <Mention content={"PP"} selectedChannel={"1-0-1"} />
            </pre>
        </div>
    );
};

const MessageItemFancy = ({ message }: { message: Message }) => {
    const { sender, content, image } = message;
    return (
        <div className="bg-gray-800 border-lime-400 border-l-4 rounded-md p-2">
            <div className="font-larry font-light text-xs md:text-base">
                <Markdown children={content} />
                <Mention content={"PP"} selectedChannel={"1-0-1"} />
            </div>
        </div>
    );
};

const MessageItemResume = ({ message }: { message: Message }) => {
    return (
        <iframe
            src={Resume}
            className="h-[575] md:h-[1058] w-full"
        ></iframe>
    );
};

let MessageItemOfType = {
    [MessageType.DEFAULT]: MessageItemDefault,
    [MessageType.FANCY]: MessageItemFancy,
    [MessageType.RESUME]: MessageItemResume,
};

const MessageItem = (props: MessageItemProps) => {
    const CurrentMessageItem = MessageItemOfType[props.messageType];
    return (
        <div className="flex pb-6 space-x-4">
            <div className="w-10 h-10 flex-shrink-0">
                <img
                    className="rounded-3xl"
                    src={props.message.sender.icon}
                    alt="AVATAR"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="text-cyan-400">{props.message.sender.name}</div>
                <CurrentMessageItem message={props.message} />
            </div>
        </div>
    );
};

const Mention = ({
    content,
    selectedChannel
}: {
    content: string;
    selectedChannel: string
}) => {
    const { server, setServer, serverList} = useContext(AppContext);
    const globalStateContext = useContext(GlobalStateContext);
    const [serverId, channelGroupId, channelId] = splitIds(selectedChannel)
    return (
        <span
            className="bg-starblue-100 opacity-75 rounded-md font-medium pr-1 cursor-pointer"
            onClick={()=>{
                setServer(serverList[serverId])
                globalStateContext.setSelectedChannel(serverId+"-"+channelGroupId+"-"+channelId)
                globalStateContext.setSelectedServer(serverId)
            }}
        >
            {" @ " + content}
        </span>
    );
};

export default Messages;

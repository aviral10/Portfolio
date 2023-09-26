import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Message,
    MessageGroup,
    MessageType,
    MessagesProps,
    ScrollableComponentProps,
} from "../../model/interfaces";
import KeyGenerator from "../../model/KeyGenerator";
import Resume from "../../assets/AviralRana_Resume.pdf";
import GlobalStateContext from "./GlobalStateContext";
import { splitIds } from "../../model/utils";
import AppContext from "./AppContext";
import { parseMessage } from "./MessageProcessor";
import InputComponent from "./InputComponent";

const scrollToBottom = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
};

const Messages = (props: MessagesProps) => {
    const ref = useRef(null);
    const firstRender = useRef(true);
    const globalStateContext = useContext(GlobalStateContext);
    const { server, setServer } = useContext(AppContext);

    // Typescript was complaining here :(
    const messageGroupState = useState(props.messageGroups);
    const messageGroup = messageGroupState[0];
    const setMessageGroup = messageGroupState[1];

    const [serverId, channelGroupId, channelId] = splitIds(
        globalStateContext.selectedChannel
    );

    useEffect(() => {
        setMessageGroup(props.messageGroups);
        firstRender.current = true;
    }, [globalStateContext.selectedChannel]);

    useEffect(() => {
        firstRender.current
            ? (firstRender.current = false)
            : scrollToBottom(ref);
    }, [messageGroup]);

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
                        let sample = createUserMessage(e.target.value);
                        let messageGroups = server.channelGroups[channelGroupId].channelItems[channelId].messageGroups
                        e.target.value = "";

                        
                        const displayDate = getTodaysDate();
                        messageGroups[messageGroups.length-1].date === displayDate
                            ? null
                            : server.channelGroups[channelGroupId]
                            .channelItems[channelId]
                            .messageGroups.push({
                                  date: displayDate,
                                  messages: [],
                              });

                        messageGroups[messageGroups.length-1].messages.push(sample)
                        
                        let newMessageGroup = structuredClone(
                            server.channelGroups[channelGroupId].channelItems[
                                channelId
                            ].messageGroups
                        );
                        setMessageGroup(newMessageGroup);
                    }
                }}
            />
        </div>
    );
};

const getTodaysDate = ()=>{
    const today = new Date();
    const date = today.getDate();
    const month = today.toLocaleString("default", {
        month: "short",
    });
    const year = today.getFullYear();
    return `${date} ${month}, ${year}`;
}



// Pulling a prank on a friend
const createUserMessage = (content: string): Message => {
    return {
        sender: {
            name: "Pain in the butt!",
            icon: "https://media.licdn.com/dms/image/D4D03AQENLlGuJ05AIg/profile-displayphoto-shrink_800_800/0/1686918845899?e=2147483647&v=beta&t=zpOvvFLSc2iiDcbL5vKQBAnT1EbptPFd_0tpuAJlesg",
        },
        content: content,
        image: "",
        messageType: MessageType.DEFAULT,
    };
};

const ScrollableComponent = (props: ScrollableComponentProps) => {
    const { messageHeader, messageGroups } = props;
    const [header1, header2, header3] = messageHeader;

    return (
        <div className="w-full h-[calc(100%-64px)] rounded-lg overflow-y-scroll">
            <div className="p-4">
                <div className="w-[92vw] md:w-full flex flex-col items-center justify-center text-3xl font-semibold mb-4">
                    <p>{header1}</p>
                    <p>{header2}</p>
                    <p className="pt-3 text-sm font-extralight text-gray-400">
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
                <MessageItemNormal
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
    const { server, setServer } = useContext(AppContext);
    const globalStateContext = useContext(GlobalStateContext);
    return (
        <div className="flex flex-col">
            <div className="text-cyan-400">{message.sender.name}</div>
            <div className="text-xs md:text-base">
                <pre className="font-larry font-light break-all whitespace-pre-wrap overflow-x-auto">
                    {parseMessage(content)}
                </pre>
            </div>
        </div>
    );
};

const MessageItemFancy = ({ message }: { message: Message }) => {
    const { sender, content, image } = message;
    let imageUrl = image ? (image === "IMAGE_URL" ? null : image) : null;
    return (
        <div className="w-fit md:max-w-[80%] flex flex-col">
            <div className="text-cyan-400">{message.sender.name}</div>
            <div className="bg-gray-800 border-lime-400 border-l-4 rounded-md p-2">
                <div className="font-larry font-light text-xs md:text-base break-all whitespace-pre-wrap">
                    {parseMessage(content)}
                </div>
                {imageUrl ? (
                    <img
                        className="object-contain rounded-sm"
                        src={image}
                        alt=""
                    />
                ) : null}
            </div>
        </div>
    );
};

const MessageItemOnlyTags = ({ message }: { message: Message }) => {
    const { sender, content, image } = message;
    const links = content.split(";");
    const heading = links.splice(0, 1);
    const imageElements = links.map((link) => (
        <img
            key={KeyGenerator.getInstance().getNewKey()}
            className="h-4 md:h-6 rounded-sm"
            src={link}
            alt=""
        />
    ));
    const imageContainers: JSX.Element[][] = [];
    imageElements.map((element, index) => {
        index % 4 ? null : imageContainers.push([]);
        imageContainers[imageContainers.length - 1].push(element);
    });
    return (
        <div className="flex flex-col">
            <div className="text-cyan-400">{message.sender.name}</div>
            <div className="w-fit bg-gray-800 border-lime-400 text-xs md:text-base border-l-4 rounded-md p-2">
                <span className="font-medium">{heading}</span>
                <div className="p-1">
                    {imageContainers.map((container) => {
                        return (
                            <div
                                key={KeyGenerator.getInstance().getNewKey()}
                                className="flex space-x-2 p-1"
                            >
                                {container}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const MessageItemResume = ({ message }: { message: Message }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="text-cyan-400">{message.sender.name}</div>
            <iframe
                src={Resume}
                className="h-[575] md:h-[1058] w-full"
            ></iframe>
        </div>
    );
};

let MessageItemOfType = {
    [MessageType.DEFAULT]: MessageItemDefault,
    [MessageType.FANCY]: MessageItemFancy,
    [MessageType.RESUME]: MessageItemResume,
    [MessageType.ONLYTAGS]: MessageItemOnlyTags,
};

const MessageItemNormal = (props: MessageItemProps) => {
    const CurrentMessageItem = MessageItemOfType[props.messageType];
    return (
        <div className="flex pb-6 space-x-2 md:space-x-4">
            <div className="w-10 h-10 flex-shrink-0">
                <img
                    className="rounded-3xl"
                    src={props.message.sender.icon}
                    alt="AVATAR"
                />
            </div>

            <CurrentMessageItem message={props.message} />
        </div>
    );
};

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

export default Messages;

import { useContext, useEffect, useRef, useState } from "react";
import {
    Message,
    MessageGroup,
    MessageItemProps,
    MessageType,
    MessagesProps,
    ScrollableComponentProps,
} from "../../model/interfaces";
import KeyGenerator from "../../model/KeyGenerator";
import Resume from "../../assets/AviralRana_Resume.pdf";
import GlobalStateContext from "./GlobalStateContext";
import { getTodaysDate, splitIds } from "../../model/utils";
import AppContext from "./AppContext";
import { parseMessage } from "./converters/MessageProcessor";
import InputComponent from "./InputComponent";
import AnonymousAnimal from "../../model/AnonymousAnimal";
import ImageCache from "../../model/ImageCache";
import Analytics from "../../model/Analytics/Analytics";

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
    let selectedChannel = globalStateContext.selectedChannel;
    const [serverId, channelGroupId, channelId] = splitIds(selectedChannel);

    useEffect(() => {
        setMessageGroup(props.messageGroups);
        firstRender.current = true;
    }, [globalStateContext.selectedChannel]);

    useEffect(() => {
        firstRender.current ? (firstRender.current = false) : scrollToBottom(ref);
    }, [messageGroup]);

    const handleMessageSent = (e: any) => {
        let sample = createUserMessage(e.value);

        let messageGroups =
            server.channelGroups[channelGroupId].channelItems[channelId]
                .messageGroups;
        e.value = "";

        const displayDate = getTodaysDate();
        messageGroups[messageGroups.length - 1].date === displayDate ? 
        null : server.channelGroups[channelGroupId]
                     .channelItems[channelId]
                     .messageGroups.push({
                        date: displayDate,
                        messages: [],
                    });

        messageGroups[messageGroups.length - 1].messages.push(sample);

        let newMessageGroup = structuredClone(
            server.channelGroups[channelGroupId].channelItems[channelId]
                .messageGroups
        );

        let pageName = server.channelGroups[channelGroupId]
                             .channelItems[channelId]
                             .name
                             .toLowerCase();
        
            Analytics.sendMessage(sample.content, pageName);

        setMessageGroup(newMessageGroup);
    };

    return (
        <div className="flex flex-col flex-shrink-0 h-full w-full md:w-[75%] bg-gray-700 text-white shadow-lg">
            <ScrollableComponent
                messageHeader={props.messageHeader}
                messageGroups={messageGroup}
                endRef={ref}
            />
            <InputComponent onSend={(e) => handleMessageSent(e)} />
        </div>
    );
};

const createUserMessage = (content: string): Message => {
    let { name, randomAnimal } = AnonymousAnimal.getInstance().getAnimal();

    return {
        sender: {
            name: name,
            icon: randomAnimal,
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

const MessageItemDefault = ({ message }: { message: Message }) => {
    const { sender, content } = message;
    return (
        <div className="flex flex-col">
            <div className="text-cyan-400">{message.sender.name}</div>
            <div className="text-xs md:text-base">
                <p className="font-larry font-light custom-break-words whitespace-pre-wrap">
                    {parseMessage(content)}
                </p>
            </div>
        </div>
    );
};

const MessageItemFancy = ({ message }: { message: Message }) => {
    const { sender, content, image } = message;
    
    let imageUrl = image ? (image === "IMAGE_URL" ? null : ImageCache.get(image)) : null;
    
    return (
        <div className={`w-fit md:max-w-[80%] flex flex-col`}>
            <div className="text-cyan-400">{message.sender.name}</div>
            <div
                className={`bg-gray-800 border-lime-400 border-l-4 rounded-md p-2  ${imageUrl ? "min-h-[120px]" : null}`}
            >
                <div className="font-larry font-light text-xs md:text-base break-words whitespace-pre-wrap">
                    {parseMessage(content)}
                </div>
                {imageUrl ? (
                    <img
                        className="md:max-w-md rounded-md m-auto"
                        src={imageUrl}
                        alt=""
                    />
                ) : null}
            </div>
        </div>
    );
};

const MessageItemOnlyTags = ({ message }: { message: Message }) => {
    const { sender, content } = message;
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
                    className="rounded-3xl bg-gray-650"
                    src={props.message.sender.icon}
                    alt="AVATAR"
                />
            </div>

            <CurrentMessageItem message={props.message} />
        </div>
    );
};

export default Messages;

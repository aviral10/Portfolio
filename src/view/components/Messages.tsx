import React from "react";
import {
    Message,
    MessageGroup,
    MessagesProps,
    ScrollableComponentProps,
} from "./interfaces";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import KeyGenerator from "../../model/KeyGenerator";

const Messages = (props: MessagesProps) => {
    return (
        <div className="flex flex-col flex-shrink-0 h-full w-full md:w-[70%] bg-gray-700 text-white shadow-lg">
            <ScrollableComponent
                messageHeader={props.messageHeader}
                messageGroups={props.messageGroups}
            />
        </div>
    );
};

const ScrollableComponent = (props: ScrollableComponentProps) => {
    const { messageHeader, messageGroups } = props;
    const [header1, header2, header3] = messageHeader;

    return (
        <div className="w-full h-[90%] rounded-lg overflow-y-scroll">
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
            </div>
        </div>
    );
};

const MessageGroup = (props: { messageGroup: MessageGroup }) => {
    const { date, messages } = props.messageGroup;

    return (
        <div className="p-3 h-full w-full">
            <div className="flex items-center justify-center">
                <div className="w-3/5">
                    <hr className="h-px border-0 bg-gray-600" />
                </div>
                <div className="pb-4 text-sm text-gray-500 w-1/6 flex flex-shrink-0 min-w-max items-center justify-center">
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
                    messageType={MessageType.FANCY}
                />
            ))}
        </div>
    );
};

export interface MessageItemProps {
    message: Message;
    messageType: MessageType;
}

enum MessageType {
    DEFAULT,
    FANCY,
}

const MessageItemDefault = ({ message }: { message: Message }) => {
    const { sender, content, image } = message;

    return (
        <div className="flex pb-6 space-x-4">
            <div className="w-12 h-12 flex-shrink-0">
                <img className="rounded-3xl" src={sender.icon} alt="AVATAR" />
            </div>
            <div className="flex flex-col">
                <div className="text-cyan-400">{sender.name}</div>
                <div className="text-md">
                    <pre className="font-larry font-light break-words whitespace-pre-wrap overflow-x-auto">
                        {content} <Mention content={"PP"} onClick={() => {}} />
                    </pre>
                </div>
            </div>
        </div>
    );
};

const MessageItemFancy = ({ message }: { message: Message }) => {
    const { sender, content, image } = message;

    return (
        <div className="flex pb-6 space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                <img className="rounded-3xl" src={sender.icon} alt="AVATAR" />
            </div>
            <div className="flex flex-col">
                <div className="text-cyan-400">{sender.name}</div>
                <div className="bg-gray-800 border-lime-400 border-l-4 rounded-md text-md p-2">
                    <div className="font-larry font-light">
                    <Markdown children={content} /><Mention content={"PP"} onClick={() => {}} />
                    </div>
                </div>
            </div>
        </div>
    );
};


let MessageItemOfType = { 
    [MessageType.DEFAULT]:MessageItemDefault, 
    [MessageType.FANCY]:MessageItemFancy
 };

 const MessageItem = (props: MessageItemProps) => {
    const CurrentMessageItem = MessageItemOfType[props.messageType]
    return <CurrentMessageItem message={props.message} />;
};

const Mention = ({
    content,
    onClick,
}: {
    content: string;
    onClick?: () => void;
}) => {
    return (
        <span
            className="bg-starblue-100 opacity-75 rounded-md font-medium pr-1 cursor-pointer"
            onClick={onClick}
        >
            {" @ " + content}
        </span>
    );
};

export default Messages;

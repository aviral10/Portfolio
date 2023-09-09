import React from "react";
import KeyGenerator from "../../model/KeyGenerator";
import { Message, MessageGroup, ScrollableComponentProps } from "./interfaces";

const Messages = () => {
    const message: Message = {
        sender: { name: "Aviral", icon: "aaa" },
        content: "This is sample content",
        image: "qqqqqweqweqwe",
    };
    const messageGroups: MessageGroup[] = [
        {
            date: "16th June, 2023",
            messages: [
                message,
                message,
                message,
                message,
                message,
                message,
                message,
                message,
                message,
            ],
        },
        {
            date: "17th June, 2023",
            messages: [message, message, message, message, message],
        },
        {
            date: "18th June, 2023",
            messages: [message, message, message, message, message],
        },
        {
            date: "19th June, 2023",
            messages: [message, message, message, message, message],
        },
    ];
    return (
        <div className="flex flex-col flex-shrink-0 h-full w-full md:w-3/4 bg-gray-700 text-white shadow-lg">
            <ScrollableComponent
                messageGroups={messageGroups}
            ></ScrollableComponent>
        </div>
    );
};

const ScrollableComponent = (props: ScrollableComponentProps) => {
    return (
        <div className="w-full h-[90%] rounded-lg overflow-y-scroll">
            <div className="p-4">
                <div className="w-[92vw] md:w-full flex flex-col items-center justify-center text-3xl font-semibold mb-4">
                    <p>Welcome to</p>
                    <p>Valhalla</p>
                    <p className="pt-3 text-sm font-extralight text-gray-500">
                        This is a Subtitle
                    </p>
                </div>

                {props.messageGroups.map((messageGroup) => (
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
    return (
        <div className="p-3 h-full w-full">
            <div className="flex items-center justify-center">
                <div className="w-3/5">
                    <hr className="h-px border-0 bg-gray-600" />
                </div>
                <div className="text-sm text-gray-500 w-1/6 flex flex-shrink-0 min-w-max items-center justify-center">
                    {props.messageGroup.date}
                </div>
                <div className="w-3/5">
                    <hr className="h-px border-0 bg-gray-600" />
                </div>
            </div>
            {props.messageGroup.messages.map((message) => {
                return (
                    <div
                        key={KeyGenerator.getInstance().getNewKey()}
                        className=""
                    >
                        {message.content}
                    </div>
                );
            })}
        </div>
    );
};

// const MessageItem = (props: {date:string, message: Message}) => {
//     return (

//     )
// }

export default Messages;

import React from "react";
import KeyGenerator from "../../model/KeyGenerator";
import { Message, MessageGroup, MessagesProps, ScrollableComponentProps } from "./interfaces";

const Messages = (props: MessagesProps) => {
    
    return (
        <div className="flex flex-col flex-shrink-0 h-full w-full md:w-[70%] bg-gray-700 text-white shadow-lg">
            <ScrollableComponent
                messageHeader={props.messageHeader}
                messageGroups={props.messageGroups}
            ></ScrollableComponent>
        </div>
    );
};

const ScrollableComponent = (props: ScrollableComponentProps) => {
    return (
        <div className="w-full h-[90%] rounded-lg overflow-y-scroll">
            <div className="p-4">
                <div className="w-[92vw] md:w-full flex flex-col items-center justify-center text-3xl font-semibold mb-4">
                    <p>{props.messageHeader[0]}</p>
                    <p>{props.messageHeader[1]}</p>
                    <p className="pt-3 text-sm font-extralight text-gray-500">
                        {props.messageHeader[2]}
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
                    >
                        {message.content}
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;

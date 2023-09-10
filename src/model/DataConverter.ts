import { ChannelGroup, ChannelItem, Message, MessageGroup, Server } from "../view/components/interfaces";

export default class DataConverter {
    public convertServer(obj: any): Server {
        let server: Server = {
            name: obj.name,
            image: obj.image,
            channelGroups: obj.channelGroups.map((channelGroup: any) =>
                this.convertChannelGroup(channelGroup)
            ),
        };
        return server;
    }

    public convertChannelGroup(obj: any): ChannelGroup {
        let channelGroup: ChannelGroup = {
            name: obj.name,
            id: obj.id,
            channelItems: obj.channelItems.map((channelItem: any) =>
                this.convertChannelItem(channelItem)
            )
        };
        return channelGroup;
    }

    public convertChannelItem(obj: any): ChannelItem {
        let channelItem: ChannelItem = {
            name: obj.name,
            messageHeader: obj.messageHeader,
            messageGroups: obj.messageGroups.map((messageGroup: any)=>
                this.convertMessageGroup(messageGroup)
            )
        }

        return channelItem;
    }
    public convertMessageGroup(obj: any) : MessageGroup {
        let messageGroup: MessageGroup = {
            date: obj.date,
            messages: obj.messages.map((message:any)=>
                this.convertMessage(message)
            )
        }
        return messageGroup
    }

    public convertMessage(obj: any) : Message {
        let message: Message = {
            content: obj.content,
            image: obj.image,
            sender: {
                name: obj.sender.name,
                icon: obj.sender.icon
            }
        }
        return message
    }
}

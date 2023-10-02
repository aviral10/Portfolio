import { ChannelGroup, ChannelItem, Message, MessageGroup, MessageType, MyProfileTab, Server} from "./interfaces";

export default class DataConverter {
    
    public convertMyProfileTab(obj: any): MyProfileTab {
        let myProfile: MyProfileTab = {
            image: obj.image,
            name: obj.name,
            title: obj.title,
            status: obj.status,
            locationTitle: obj.locationTitle,
            locationLink: obj.locationLink,
            email: obj.email,
            discord: obj.discord,
            discordImage: obj.discordImage
        };
        return myProfile;
    }

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
            ),
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
            },
            messageType: this.convertMessageType(obj.messageType)
        }
        return message
    }

    public convertMessageType(messageType: any): MessageType {
        let types:{[key: string]:MessageType} = {
            "default": MessageType.DEFAULT,
            "fancy": MessageType.FANCY,
            "resume": MessageType.RESUME,
            "onlytags": MessageType.ONLYTAGS
        };
        return types[messageType] || MessageType.DEFAULT;
    }
}

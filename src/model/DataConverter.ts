import { ChannelGroup, Server } from "../view/components/interfaces";

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
                channelItem.toString()
            ),
        };
        return channelGroup;
    }
}

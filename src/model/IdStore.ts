import { Server } from "./interfaces";

export default class IdStore{
    private IdMap:Map<string, string> = new Map<string, string>();
    private static instance: IdStore;
    private constructor() {}
    public static getInstance(): IdStore {
        (!IdStore.instance)?IdStore.instance = new IdStore():null
        return IdStore.instance;
    }

    public populate(serverList: Server[]){
        serverList.map((server, serverId)=>{
            server.channelGroups.map((channelGroup, channelGroupId)=>{
                channelGroup.channelItems.map((channelItem, channelItemId)=>{
                    this.IdMap.set(channelItem.name.toLowerCase(), serverId+"-"+channelGroupId+"-"+channelItemId)
                })
            })
        })
    }
    public getIdOf(name: string, defaultID:string="0-0-0"){
        let channelID = this.IdMap.get(name)
        return channelID?channelID:defaultID
    }
}
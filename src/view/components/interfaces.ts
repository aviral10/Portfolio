export interface Server{
    name: string;
    image:string;
    channelGroups: ChannelGroups[]
}

export interface SideIconProps{
    server: Server
    image: string
    tooltip: string
}

export interface ChannelItemsProps{
    items: string[];
    isSelectedState: [number, (changeState: number) => void]; 
}

export interface AppContext{
    server:Server
    setServer:(server: Server) => void
}

export interface ChannelGroups{
    name: string,
    channelItems: string[]
}

export interface ChannelGroupProps {
    name: string;
    items: string[];
}
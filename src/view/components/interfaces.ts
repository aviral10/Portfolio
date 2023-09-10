export interface Server {
    name: string;
    image: string;
    channelGroups: ChannelGroup[];
}

export interface SideIconProps {
    index: number;
    server: Server;
    image: string;
    tooltip: string;
    isSelectedState: number;
    setSelectedState: (isSelectedState: number) => void;
}

export interface ScrollableComponentProps {
    messageGroups: MessageGroup[];
}

export interface MessageGroup {
    date: string;
    messages: Message[];
}

export interface SearchBarProps {
    hamburger: [any, any];
}

export interface SideBarProps {
    serverList: Server[];
}

export interface ChannelProps{
    selectedChannel:string, 
    setSelectedChannel:(selectedChannel:string)=>void
}

export interface Message {
    sender: { name: string; icon: string };
    content: string;
    image: string;
}

export interface AppContext {
    server: Server;
    setServer: (server: Server) => void;
}
export interface Hamburger {
    hamburgerClicked: boolean;
    setHamburgerClicked: (hamburgerClicked: boolean) => void;
}

export interface ChannelGroup {
    name: string;
    channelItems: string[];
    id: number;
}

export interface ChannelGroupProps {
    name: string;
    items: string[];
    id: number;
    selectedChannel: any;
    setSelectedChannel: (selectedChannel: string) => void;
}

export interface ChannelItemsProps {
    items: string[];
    parent: number;
    selectedChannel: string;
    setSelectedChannel: (selectedChannel: string) => void;
}

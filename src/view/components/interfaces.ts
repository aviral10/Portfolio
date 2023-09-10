export interface Server {
    name: string;
    image: string;
    channelGroups: ChannelGroup[];
}

export interface ChannelsProps{
    selectedChannel: string;
    setSelectedChannel: (selectedChannel: string) => void;
}

export interface MessagesProps{
    messageHeader: string[];
    messageGroups: MessageGroup[]
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
    messageHeader: string[];
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

export interface ChannelItem {
    name: string,
    messageHeader: string[];
    messageGroups: MessageGroup[];
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
    channelItems: ChannelItem[];
    id: number;
}

export interface ChannelGroupProps {
    name: string;
    items: ChannelItem[];
    id: number;
    selectedChannel: any;
    setSelectedChannel: (selectedChannel: string) => void;
}

export interface ChannelItemsProps {
    items: ChannelItem[];
    parent: number;
    selectedChannel: string;
    setSelectedChannel: (selectedChannel: string) => void;
}
